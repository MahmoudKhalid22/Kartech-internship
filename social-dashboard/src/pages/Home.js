import React from "react";
import { useGetAllProductsQuery } from "../features/usersApi";
import styles from "./Home.module.css";

function Home() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const posts = data?.map((post) => post.posts);

  const flattenedPosts = posts?.flatMap((posts) => posts);
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
              <div key={post.id} className={styles.post}>
                <div className={styles.credentials}>
                  <div>
                    <div></div>
                    <p>{post.name}</p>
                  </div>
                  <div>
                    <p>{new Date(post.dateTime).getMonth() + 1}</p>
                    <p>{new Date(post.dateTime).getFullYear()}</p>
                    <p>{new Date(post.dateTime).getDate()}</p>
                  </div>
                </div>
                <div>{post.content}</div>
                <div>
                  <div>{post.likes}</div>
                  <div>
                    <p>{post.comments}</p>
                    <p>{post.shares}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
