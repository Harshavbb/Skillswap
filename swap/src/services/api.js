export const fetchSkills = async () => {
    const response = await fetch('/api/skills');
    return response.json();
  };
  
  export const fetchUserProfile = async () => {
    const response = await fetch('/api/user/profile');
    return response.json();
  };
  