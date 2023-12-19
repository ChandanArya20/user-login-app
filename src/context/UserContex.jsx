import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create user context
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	
  const [currentUser, setCurrentUser] = useState(null);

  // Function to log in the user
  const loginUser = async (email, password, next) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      // Store user data in local storage and set current user
      localStorage.setItem("userData", JSON.stringify(response.data));
      setCurrentUser(response.data);
      next();
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error if needed
    }
  };

  // Check if the user is logged in
  const isUserLoggedin = () => {
    let data = localStorage.getItem("userData");
    return data !== null;
  };

  // Function to log out the user
  const logoutUser = async (next) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/user/logout`,
        { withCredentials: true }
      );

      // Remove user data from local storage and set current user to null
      localStorage.removeItem("userData");
      setCurrentUser(null);
      next();
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error if needed
    }
  };

  // Function to check user login status
  const checkLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/user/check-login`,
        { withCredentials: true }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          // UNAUTHORIZED---user session(token) is expired
          logoutUser(() => {});
        }
      }
    }
  };

  // Return current user details with partial user data
  const getCurrentUserDetails = () => {
    if (isUserLoggedin()) {
      const userData = localStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      return parsedData;
    } else {
      return null;
    }
  };

  // Run checkLogin and set initial current user on component mount
  useEffect(() => {
    checkLogin();
    setCurrentUser(getCurrentUserDetails());
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loginUser,
        logoutUser,
        isUserLoggedin,
        getCurrentUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
