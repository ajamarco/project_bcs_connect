"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

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
