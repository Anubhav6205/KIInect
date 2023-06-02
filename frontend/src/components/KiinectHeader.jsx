import React, { useState } from "react";

import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
  AssignmentTurnedInOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore
} from "@material-ui/icons";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@material-ui/icons/Close";
import TerminalIcon from '@mui/icons-material/Terminal';
import { Avatar, Input } from "@material-ui/core";
import FeedIcon from '@mui/icons-material/Feed';
import "./css/KiinectHeader.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../feature/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { setSearchQuery } from "../feature/searchSlice";

function KiinectHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon />;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleSubmit = async (e) => {
    if (question != "") {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user
      };
      await axios
        .post("http://localhost:5000/api/questions", body, config)
        .then((res) => {
          console.log(res.data);

          console.log("Data submitted successfully");
          alert("Data submitted successfully");
          //reloads page back to homepage
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(`Unable to submit: ${err.message}`);
          alert("Error in adding question");
        });
    }
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("logged out");
        })
        .catch((err) => {
          console.log("error: " + err.message);
        });
    }
  };

 
  return (
    <div className="kHeader">
      <div className="kHeader-content">
        <div className="kHeader-left">
          <Link to="/">
            {" "}
            <div className="kHeader__logo">
              <img
                src="https://cdn.dribbble.com/users/737543/screenshots/4322980/ezgif.com-optimize.gif"
                alt="logo"
              />{" "}
            </div>
          </Link>

          <div className="kHeader__icons">
            <div className="kHeader__icon">
              <Link to="/">
                <HomeIcon className="icon" />
              </Link>
            </div>
            <div className="kHeader__icon">
              <Link to="/featured">
                <FeedIcon className="icon" />
              </Link>
            </div>
            <div className="kHeader__icon">
              <Link to="/assign">
                <TerminalIcon  className="icon" />
              </Link>
            </div>
            <div className="kHeader__icon">
              <Link to="/people">
                <PeopleAltOutlined className="icon" />
              </Link>
            </div>
            <div className="kHeader__icon">
              <Link to="/nota">
                <NotificationsActiveIcon className="icon" />
              </Link>
            </div>
          </div>
        </div>
        <div className="kHeader-right">
          <div className="kHeader__input">
            <Search />

            <input
              type="text"
              placeholder="Search questions"
              name="search"
              autoComplete="off"
              onChange={(event) => {
                dispatch(setSearchQuery(event.target.value));
              }}
            />
          </div>
          <div className="kHeader__Rem">
            <span></span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ask_question"
            >
              Create
            </button>
            <Avatar
              src={user?.photo}
              onClick={() => {
                handleLogout();
              }}
              className="logout"
            />
          </div>
          <div className="modal-wrap">
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
              <div className="modal__title">
                <h5>Add Question</h5>
              </div>
              <div className="modal__info">
                <Avatar src={user?.photo} className="avatar" />
                <div className="modal__scope">
                  <PeopleAltOutlined />
                  <p className="public">Public</p>
                  <ExpandMore />
                </div>
              </div>
              <div className="modal__Field">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type=" text"
                  placeholder="What's on your mind ? "
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <input
                    type="text"
                    value={inputUrl}
                    className="link"
                    onChange={(e) => setInputUrl(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      margin: "2rem 0 0 0",
                      borderBottom: "2px solid black"
                    }}
                    placeholder="Please enter the URL for the image you would like to upload "
                  />
                  {inputUrl !== "" && (
                    <img
                      style={{
                        height: "40vh",
                        objectFit: "contain"
                      }}
                      src={inputUrl}
                      alt="displayimage"
                    />
                  )}
                </div>
              </div>
              <div className="modal__buttons">
                <button
                  className="cancle"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="ask_question"
                >
                  Add Question
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KiinectHeader;
