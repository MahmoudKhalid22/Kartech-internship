import React from "react";
import { useGetAllProductsQuery } from "../features/usersApi";
import { AiFillLike } from "react-icons/ai";
import styles from "./Home.module.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Home() {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  return (
    <>
      {isLoading ? (
        <h4 className="loading">loading...</h4>
      ) : isError ? (
        <h4 className="error">An error occured</h4>
      ) : (
        <div>
          <form className={styles.form}>
            <input placeholder="Do you think anything" />
          </form>
          {data?.map((posts) =>
            posts.posts?.flatMap((post) => (
              <div key={post.id} className={styles.container}>
                <div className={styles.credentials}>
                  <div className={styles.avatar}>
                    <img src={posts.avatar} alt={posts.name} />
                  </div>
                  <div>
                    <h3>{posts.name}</h3>
                    <div className={styles.date}>
                      <p>{months[new Date(post.dateTime).getMonth()]}</p>
                      <p>{new Date(post.dateTime).getFullYear()}</p>
                      <p>{new Date(post.dateTime).getDate()}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.posts}>{post.content}</div>
                <div className={styles.numbers}>
                  <div>
                    <AiFillLike className={styles.icon} />
                    {post.likes} likes
                  </div>
                  <div className={styles.share}>
                    <p>{post.comments} comments</p>
                    <p>.</p>
                    <p>{post.shares} shares</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Home;
