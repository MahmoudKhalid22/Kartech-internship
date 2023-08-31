import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import styles from "./Friend.module.css";

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

function Friend() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/MahmoudKhalid22/Kartech-internship/main/social-dashboard/data/users.json"
      );
      const data = await response.json();

      const user = data.users?.find((user) => user.id.toString() === id.toString());
      setUser(user);
    };

    getData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <div className={styles.images}>
          <div className={styles.cover}>
            <img src={user.cover} alt={user.name} loading="lazy" />
          </div>
          <div className={styles.avatar}>
            <img src={user.avatar} alt={user.name} loading="lazy" />
          </div>
          <h3 className={styles.name}>{user.name}</h3>
        </div>
        <div className={styles.details}>
          <div className={styles.item}>
            <span>age:</span>
            <p>{user.age}</p>
          </div>
          <div className={styles.item}>
            <span>followers:</span>
            <p>{user.followers}</p>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        {user.posts?.map((post) => (
          <div>
            <div className={styles.credentials}>
              <div className={styles.postImg}>
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className={styles.text}>
                <p>{user.name}</p>
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

export default Friend;
