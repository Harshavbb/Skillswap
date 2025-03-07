import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Matchmaking from "./Matchmaking";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = auth.currentUser;
      if (loggedInUser) {
        const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
        setUser({ id: loggedInUser.uid, ...userDoc.data() });
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard">
      <h1>👋 Welcome {user?.username}</h1>
      {user && <Matchmaking currentUser={user} />}
    </div>
  );
};

export default Dashboard;
