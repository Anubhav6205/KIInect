import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import Kiinect from "./components/Kiinect";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import { onAuthStateChanged } from "firebase/auth";
import Featuredplay from "./components/Featuredplay";
import Assignment from "./components/Assignment";
import People from "./components/People";
import KiinectHeader from "./components/KiinectHeader";
import Notification from "./components/Notification";
import Food from "./components/sidebar/Food";
import Sports from "./components/sidebar/Sports";
import Tour from "./components/sidebar/Tour";
import Transport from "./components/sidebar/Transport";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import NotDeveloped from "./components/NotDeveloped";

function App() {
  const postUserData = async (name, email, url) => {
    
    console.log("Inside func");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = {
      name: name,
      email: email,
      photoURL: url
    };
    console.log(body);
    await axios
      .post("http://localhost:5000/api/userinfos", body, config)
      .then((res) => {
        console.log(res.data);
        console.log("User data submitted successfully in frontend");
      })
      .catch((error) => {
        console.log(`Unable to submit user data in frontend`);
        console.log(error);
      });
  };
  // user retrieves the current user state from the Redux store, while dispatch is used to dispatch actions to the store.
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //if user exist redirect to Kiinect else Login

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery,setSearchQuery]=useState(true);

  useEffect(() => {
    // This function is used to listen for changes in the authentication state of the Firebase app.
    //whenever auth is changed , function is executed

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid
          })
        );
        postUserData(authUser.displayName, authUser.email, authUser.photoURL);
        console.log("authUser");
      }
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loader">
        <PropagateLoader
          aria-label="Loading Spinner"
          data-testid="loader"
          color="#6b4ae1"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        {user ? (
          <div className="App">
            {/* <h1>This is for testing</h1> */}
            {/* {user ? <Kiinect /> : <Login />} */}
            {/* <Notification/>  */}
            {/* <Assignment/> */}
            {/* <Featuredplay/> */}
            {/* <People/> */}
            <KiinectHeader />
            <Switch>
              <Route path="/featured">
                <Featuredplay></Featuredplay>
              </Route>

              <Route path="/assign">
                <Assignment></Assignment>
              </Route>
              <Route path="/people">
                <People></People>
              </Route>
              <Route path="/notify">
                <Notification></Notification>
              </Route>
              <Route path="/food">
                <Food></Food>
              </Route>
              <Route path="/sports">
                <Sports></Sports>
              </Route>
              <Route path="/tour">
                <Tour></Tour>
              </Route>
              <Route path="/transport">
                <Transport></Transport>
              </Route>
              <Route path="/nota">
                <NotDeveloped></NotDeveloped>
              </Route>
              <Route path="/">
                <Kiinect></Kiinect>
              </Route>
            </Switch>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
