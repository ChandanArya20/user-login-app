import { createContext, useEffect, useState } from "react";

//create user context
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

	const [currentUser, setCurrentUser] = useState(null);

	//to make user logged in
	const loginUser = (data, next) => {
		localStorage.setItem("userData", JSON.stringify(data));
		setCurrentUser(data.user);
		next();
	};

	
	//check if user is logged in
	const isUserLoggedin = () => {

		let data = localStorage.getItem("userData");

		if (data != null){
			return true;
		}else{
			return false;
		}
	};


	//make user logged out
	const logoutUser = (next) => {

		localStorage.removeItem("userData");
		setCurrentUser(null);
		next();
	};


	//return current user details having partial user data
	const getCurrentUserDetails = () => {

		if (isUserLoggedin()) {
			const userData = localStorage.getItem("userData");
			const parsedData = JSON.parse(userData);
			return parsedData.user;
		} else {
			return null;
		}
	};

	useEffect(() => {
		setCurrentUser(getCurrentUserDetails());
	}, []);

	return (
		<UserContext.Provider
			value={{ currentUser, loginUser, logoutUser, isUserLoggedin, getCurrentUserDetails }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
