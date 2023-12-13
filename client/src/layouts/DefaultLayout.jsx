import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Default() {
	return (
		<>
			<section className="flex flex-col p-4 min-h-screen relative">
				<Header />
				<Outlet />
			</section>
		</>
	);
}
