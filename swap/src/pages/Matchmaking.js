import { useEffect, useState } from "react";
import { fetchUsers } from "./utils/firestore"; 
import { findMatches } from "./utils/matchmaking";

const Matchmaking = ({ currentUser }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const getMatches = async () => {
            const usersList = await fetchUsers();
            const matchedUsers = findMatches(currentUser, usersList);
            setMatches(matchedUsers);
        };

        getMatches();
    }, [currentUser]);

    return (
        <div>
            <h2>Skill Matches for {currentUser.name}</h2>
            {matches.length > 0 ? (
                matches.map((matchData, index) => (
                    <div key={index} className="match-card">
                        <h3>{matchData.match.name}</h3>
                        <p>Can Teach You: {matchData.commonSkills.join(", ")}</p>
                        {matchData.mutualSkills.length > 0 && (
                            <p>You Can Teach Them: {matchData.mutualSkills.join(", ")}</p>
                        )}
                        <button onClick={() => sendMatchRequest(currentUser, matchData.match)}>Request Match</button>
                    </div>
                ))
            ) : (
                <p>No matches found yet.</p>
            )}
        </div>
    );
};

// Function to send a match request
const sendMatchRequest = (currentUser, matchedUser) => {
    console.log(`Match request sent from ${currentUser.name} to ${matchedUser.name}`);
};

export default Matchmaking;
