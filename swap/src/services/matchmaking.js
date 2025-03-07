export const findMatches = (currentUser, usersList) => {
    let matches = [];

    usersList.forEach(otherUser => {
        if (currentUser.id !== otherUser.id) { 
            let commonSkills = currentUser.skillsAcquired.filter(skill => otherUser.skillsOffered.includes(skill));
            let mutualSkills = currentUser.skillsOffered.filter(skill => otherUser.skillsAcquired.includes(skill));

            if (commonSkills.length > 0) {
                matches.push({
                    match: otherUser,
                    commonSkills,
                    mutualSkills,
                    score: commonSkills.length + mutualSkills.length
                });
            }
        }
    });

    // Sort by best mutual matches first
    return matches.sort((a, b) => b.score - a.score);
};
