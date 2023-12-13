import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router";
import axios from "axios";
import { FrontContext } from "../../context/FrontContext";
import AccountNav from "../../components/AccountNav";

export default function AccountPage() {
	const [redirect, setRedirect] = useState(null);
	const { user, setUser, ready } = useContext(FrontContext);

	let { subpage } = useParams();

	if (subpage === undefined) {
		subpage = "profile";
	}
	const handleLogout = async () => {
		try {
			await axios.post("/logout");
			setRedirect("/");
			setUser(null);
		} catch (error) {
			console.error(error);
		}
	};

	if (!ready) {
		return <p>Loading...</p>;
	}

	if (ready && !user && !redirect) {
		return <Navigate to={`/login`} />;
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<>
			<AccountNav />
			<div className="text-center max-w-lg mx-auto">
				<p>
					Logged in as {user.name} ({user.email})
				</p>
				<button onClick={handleLogout} className="primary max-w-sm mt-2">
					Logout
				</button>
			</div>
		</>
	);
}
