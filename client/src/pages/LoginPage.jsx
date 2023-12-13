import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FrontContext } from "../context/FrontContext";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);

	const { setUser } = useContext(FrontContext);

	const handleEmail = (ev) => {
		setEmail(ev.target.value);
	};
	const handlePass = (ev) => {
		setPassword(ev.target.value);
	};

	const handleLogin = async (ev) => {
		ev.preventDefault();

		try {
			const { data } = await axios.post(
				"/login",
				{ email, password },
				{ withCredentials: true }
			);
			setUser(data);
			alert("Login successful!");
			setRedirect(true);
		} catch (error) {
			alert("Login error, please try again later");
		}
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<>
			<section className="mt-4 grow flex items-center justify-around">
				<div className="-mt-64">
					<h1 className="text-4xl text-center mb-4">Login</h1>
					<form className="max-w-lg mx-auto" onSubmit={handleLogin}>
						<input
							type="email"
							placeholder="your@email.com"
							value={email}
							onChange={handleEmail}
							name="email"
							id="email"
						/>
						<input
							type="password"
							placeholder="password123"
							value={password}
							onChange={handlePass}
							name="password"
							id="password"
						/>
						<button className="primary mt-2">Login</button>
						<div className="text-center py-2 text-gray-400">
							Don&apos;t have an account yet?{" "}
							<Link to={"/register"} className="underline text-black">
								Register now
							</Link>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
