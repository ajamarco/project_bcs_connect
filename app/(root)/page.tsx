import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  console.log("printing result", result);
  //get the current user
  const user = await currentUser();
  if (!user) return null;

  //create a function in charge of rendering the posts on the page
  const renderPosts = () => {
    return (
      <>
        {/* rendering a <p> tag for no posts found */}
        {result.posts.length === 0 ? (
          <p className="text-center">No posts found</p>
        ) : (
          <>
            {/* rendering the ThreadCard */}
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div className="h-screen">
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">{renderPosts()}</section>
    </div>
  );
}
