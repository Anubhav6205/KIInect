import React, { useState, useEffect } from "react";
import "./css/Assignment.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import axios from "axios";
function Assignment() {
  const [inputText, setInputText] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const user = useSelector(selectUser);

 const handleSubmit = async (event) => {
  event.preventDefault();
  
  try {
    const res = await axios.post("http://localhost:5000/api/skills/", {
      username: user?.email,
      skill: inputText
    });
    console.log(res);
    // Update userSkills state with new skill
    setUserSkills([...userSkills, inputText]);
    // Clear input field
    setInputText("");
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        const body = { username: user?.email };
        const res = await axios.post(
          "http://localhost:5000/api/skills/find",
          body,
          config
        );
        console.log(user?.email);
        setUserSkills(res.data[0].skills);
        console.log(res.data[0].skills);
        console.log("FETCHING USER SKILLS");
      } catch (err) {
        console.log("Error in FETCHING SKILLS");
        console.log(err);
      }
    };

    fetchUserSkills();
  }, []);

  return (
    <div className="assign_box">
    
      <div className="assign_container">
      <h3 className="heading">Skills</h3>
        <div className="form">
          <form onSubmit={handleSubmit} className="form-inside">
            <input
              type="text"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="skills">
          <h3>My Skills:</h3>
          <ul>
            {userSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Assignment;
