import { Avatar, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import { Modal } from "react-responsive-modal";
import CloseIcon from "@material-ui/icons/Close";
import "./css/KiinectBox.css";
import {
  AssignmentTurnedInOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore
} from "@material-ui/icons";
import axios from "axios";


function KiinectBox() {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon />;

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

  return (
    <div className="KiinectBox">
      <div className="KiinectBox_info">
        <Avatar src={user?.photo} className="avatar"/>
        <div className="question_box" onClick={() => setIsModalOpen(true)}>
          <span>Ask something!</span>
        </div>
      </div>
      <div className="KiinectBox_Kiinect"></div>
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
            <p>Public</p>
            <ExpandMore />
          </div>
        </div>
        <div className="modal__Field">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type=" text"
            placeholder="Start your question with 'What', 'How', 'Why', etc. "
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
              onChange={(e) => setInputUrl(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                margin: "2rem 0 0 0",
                borderBottom: "2px solid black"
              }}
              placeholder="Optional: inclue a link that gives context"
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
          <button className="cancle" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit" className="ask_question">
            Add Question
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default KiinectBox;
