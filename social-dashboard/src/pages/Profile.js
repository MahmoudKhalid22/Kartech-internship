import React from "react";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import styles from "./Profile.module.css";

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

function Profile() {
  const data = useSelector((state) => state.account);

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <div className={styles.images}>
          <div className={styles.cover}>
            <img src={data.user.cover} alt={data.user.name} loading="lazy" />
          </div>
          <div className={styles.avatar}>
            <img src={data.user.avatar} alt={data.user.name} loading="lazy" />
          </div>
          <h3 className={styles.name}>{data.user.name}</h3>
        </div>
        <div className={styles.details}>
          <div className={styles.item}>
            <span>age:</span>
            <p>{data.user.age}</p>
          </div>
          <div className={styles.item}>
            <span>followers:</span>
            <p>{data.user.followers}</p>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        {data.user.posts?.map((post) => (
          <div key={post.id}>
            <div className={styles.credentials}>
              <div className={styles.postImg}>
                <img src={data.user.avatar} alt={data.user.name} />
              </div>
              <div className={styles.text}>
                <p>{data.user.name}</p>
                <div className={styles.date}>
                  <p>{months[new Date(post.dateTime).getMonth()]}</p>
                  <p>{new Date(post.dateTime).getFullYear()}</p>
                  <p>{new Date(post.dateTime).getDate()}</p>
                </div>
              </div>
            </div>
            <div className={styles.content}>{post.content}</div>
            <div className={styles.numbers}>
              <div>
                <AiFillLike className={styles.icon} />
                {post.likes}
              </div>
              <div className={styles.share}>
                <p>{post.comments} comments</p>
                <span>.</span>
                <p>{post.shares} shares</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
