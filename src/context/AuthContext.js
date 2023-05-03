import { createContext } from "react";
import FirebaseAuth from "../handlers/auth";
import { useMemo } from "react";
import { useState } from "react";

const { signIn, signOut } = FirebaseAuth;
const Context = createContext();

const Provider = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const logIn = () => {};
	const logOut = () => {};

	const value = useMemo(() => {
		return {
			logIn,
			logOut,
			currentUser,
		};
	}, []);
	return <Context.Provider value={{ value }}>{children}</Context.Provider>;
};
