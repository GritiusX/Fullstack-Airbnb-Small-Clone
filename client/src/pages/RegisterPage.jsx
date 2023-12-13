import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const nameHandler = (event) => {
		setName(event.target.value);
	};
	const emailHandler = (event) => {
		setEmail(event.target.value);
	};
	const passwordHandler = (event) => {
		setPassword(event.target.value);
	};

	const registerUser = async (ev) => {
		ev.preventDefault();

		try {
			await axios.post("/register", {
				name,
				email,
				password,
			});
			return alert("Registration completed successfully");
		} catch (err) {
			return alert("Registration Failed, please try again");
		}
	};

	return (
		<>
			<section className="mt-4 grow flex items-center justify-around">
				<div className="-mt-64">
					<h1 className="text-4xl text-center mb-4">Register</h1>

					<form className="max-w-lg mx-auto" action="" onSubmit={registerUser}>
						<input
							type="text"
							placeholder="John Doe"
							value={name}
							onChange={nameHandler}
							name="fullname"
							id="fullname"
						/>
						<input
							type="email"
							placeholder="your@email.com"
							value={email}
							onChange={emailHandler}
							name="email"
							id="email"
						/>
						<input
							type="password"
							placeholder="password123"
							value={password}
							onChange={passwordHandler}
							name="email"
							id="email"
						/>
						<button className="primary mt-2">Register</button>
						<div className="text-center py-2 text-gray-400">
							Already a member?{" "}
							<Link to={"/login"} className="underline text-black">
								Login
							</Link>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
