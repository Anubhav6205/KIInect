import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
  ShareOutlined
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import LastSeen from "./CreatedTime";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [upvote, setUpvote] = useState(post.upvotes);

  const [downvote, setDownvote] = useState(post.downvotes);
  const user = useSelector(selectUser);
  const Close = <CloseIcon />;

  const handleQuill = (event) => {
    setAnswer(event);
    console.log(event);
  };
  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user
      };
      await axios
        .post("http://localhost:5000/api/answers", body, config)
        .then((response) => {
          console.log(response.data);
          console.log("Answer added successfully");
          alert("Answer added successfully");
          window.location.href = "/";
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
          console.log("Error while adding answers");
        });
    }
  };

  const handleVote = async (voteType, id) => {
    if (voteType === "upvote") {
      await axios.patch(`http://localhost:5000/api/questions/${id}/upvote`);
      setUpvote(upvote + 1);
      setDownvote(Math.max(0, downvote - 1));
    } else {
      await axios.patch(`http://localhost:5000/api/questions/${id}/downvote`);
      setDownvote(downvote + 1);
      setUpvote(Math.max(0, upvote - 1));
    }
  };

  // animateLogo();

  return (
    <div className="post">
      <div className="post__info">
        <Avatar src={post?.user?.photo} />
        <span className="name">{post?.user?.userName}</span>
        {/* passing post.createdAt as prop to find last seen for each post */}
        <small className="post__info">
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <span>{post?.questionName}</span>

          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto"
              },
              modal: {
                borderRadius: "10px"
              }
            }}
          >
            <div className="modal__question">
              <h1 className="">{post?.questionName}</h1>
              <p>
                asked by <span className="name">{post?.user?.userName}</span> on{" "}
                <span className="name">
                  {new Date(post?.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="add"
              >
                Add an answer !
              </button>
            </div>
          </Modal>
        </div>
        {post.questionUrl !== "" && (
          <a href={post.questionUrl}>
            <img src={post.questionUrl} alt="url" />
          </a>
        )}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <div className="vote">
            <ArrowUpwardOutlined
              onClick={() => {
                handleVote("upvote", post._id);
                const logo = document.querySelector(".upvote");
                logo.classList.add("animateUp");
                setTimeout(function () {
                  logo.classList.remove("animateUp");
                }, 2000);
              }}
              className="upvote"
            />
            {upvote}
          </div>
          <div className="vote animate">
            <ArrowDownwardOutlined
              onClick={() => {
                handleVote("downvote", post._id);
              }}
              className="downvote"
            />
            {downvote}
          </div>
        </div>

        <div className="post__btnAnswer">
          <ChatBubbleOutlined
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="icon"
          />
        </div>
        <div className="post__footerLeft">
          <Link to="/nota">
            <ShareOutlined />{" "}
          </Link>
          <Link to="/nota">
            <MoreHorizOutlined />{" "}
          </Link>
        </div>
      </div>
      <p
      
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0"
        }}
      >
        {post.allAnswers.length}{" "}
        {post.allAnswers.length < 2 ? "Answer" : "Answers"}
      </p>

      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray"
        }}
        className="post__answer"
      >
        {post?.allAnswers?.map((_a, _id) => (
          <div key={_id} className="answer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#888",
               
              }}
              className="post-answered"
            >
              <Avatar src={_a?.user?.photo} className="answer-photo"/>

              <div
                style={{
                  margin: "0px 10px"
                }}
                className="post-info"
              >
                <p>{_a?.user?.userName}</p>
                <span>
                  <LastSeen date={_a?.createdAt} />
                </span>
              </div>
            </div>
            {/* ReactHtmlParser function is used to convert the htmlString prop into a React component that can be rendered inside the div. */}
            <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
