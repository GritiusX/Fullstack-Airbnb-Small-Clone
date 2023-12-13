import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const FrontContext = createContext({});

export function FrontContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!user) {
			axios.get("/profile").then(({ data }) => {
				setUser(data);
				setReady(true);
			});
		}
	}, []);

	return (
		<FrontContext.Provider value={{ user, setUser, ready }}>
			{children}
		</FrontContext.Provider>
	);
}

FrontContextProvider.propTypes = {
	children: PropTypes.node,
};
