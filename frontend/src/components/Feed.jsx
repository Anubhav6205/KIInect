import React, { useEffect, useState } from "react";
import KiinectBox from "./KiinectBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
import { useSelector } from "react-redux";


function Feed() {
  const [posts, setPosts] = useState([]);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  //whenever searchQuery changes in slice , this is rerendered
  //used to extract data from store

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery == "") {
      const feedfetch = () => {
        axios.get("http://localhost:5000/api/questions").then((res) => {
          console.log(res.data);
          setPosts(res.data.reverse());
        });
      };
      feedfetch();
    } else {
      const feedfetch = async () => {
        await axios
          .post("http://localhost:5000/api/questions/search", {
            searchTerm: searchQuery
          })
          .then((res) => {
            console.log(res.data);
            setPosts(res.data.reverse());
          });
      };
      feedfetch();
    }
  }, [searchQuery]);

  return (
    <div className="feed">
      <KiinectBox />
      {posts.map((post, index) => (
        <div className="boxx">
          <Post post={post} key={index} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
