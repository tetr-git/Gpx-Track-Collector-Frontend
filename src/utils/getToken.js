export const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.accessToken : null;
  } catch (error) {
    console.error("Error parsing user data from local storage:", error);
    return null;
  }
};
