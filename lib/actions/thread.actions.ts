"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { skip } from "node:test";

//create the interface
interface Params {
  text: string;
  author: string;
  communityId: string | null; //communityId will either be a string or null, if the thread doesn't belong to a specific community
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();
    const createdThread = await Thread.create({
      text,
      author,
      community: null, //TODO: change to communityId
    });

    //update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Error creating thread: ${err}`);
  }
}

//create a function to fetch the posts. This function will take in two parameters: pageNumber and pageSize. The default values for these parameters are 1 and 20, respectively.
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    //calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    //fetch the posts that have no parents (top-level posts)
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children", // Populate the children of each post
        populate: {
          path: "author", // Populate the author of the children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });

    // Count the total number of top-level posts (threads) i.e., threads that are not comments.
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts

    const posts = await postsQuery.exec(); // Execute the query

    //check if there's a next page
    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
  } catch (err: any) {
    throw new Error(`Error fetching posts: ${err}`);
  }
}
