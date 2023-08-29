import React from "react";
import { useGetAllProductsQuery } from "../features/usersApi";

function Home() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const posts = data?.map((post) => post.posts);

  const post = posts?.filter((post) => post.length > 0);
  const flattenedPosts = post?.flatMap((posts) => posts);
  console.log(flattenedPosts);
  return (
    <div>
      {isLoading ? (
        <h3>loading...</h3>
      ) : isError ? (
        <h3>An error occured</h3>
      ) : (
        <>
          <form>
            {/* <label htmlFor="post">Do </label> */}
            <input placeholder="Do you think anything" />
          </form>
          <div>
            {flattenedPosts?.map((post, index) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
