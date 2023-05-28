import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import classes from './Dashboard.css'
import ScoreboardsGrid from "./components/ScoreboardsGrid"
import Header from "./components/Header"
import Footer from "./components/Footer/index.jsx"

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0].data();
      setName(userData.name);
    } catch (err) {
      console.error(err);
      
    }
  };

  useEffect(() => {
    if (loading) {
      // Show a loading screen or spinner while checking authentication state
      return;
    }
    if (!user) {
      navigate("/");
    } else {
      fetchUserName();
    }
  }, [user, loading, navigate]);

  return (
    <div className={classes.app}>
      <Header/>
            <main>
                <ScoreboardsGrid/>
            </main>
            <Footer/>
    </div>
  );
}

export default Dashboard;