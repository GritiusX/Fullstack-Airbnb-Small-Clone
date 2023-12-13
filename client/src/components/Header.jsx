import {
	PaperAirplaneIcon,
	MagnifyingGlassIcon,
	Bars3Icon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FrontContext } from "../context/FrontContext";
export default function Header() {
	const { user } = useContext(FrontContext);
	return (
		<header className="flex justify-between pb-6 mb-6 ">
			<Link to={"/"} className="flex items-center gap-1">
				<PaperAirplaneIcon className="h-6 w-6 -rotate-90" />
				<span className="font-semibold text-xl">AirbnC</span>
			</Link>
			<div className="flex gap-2 rounded-full py-2 px-4 border border-gray-300 shadow-md shadow-gray-300">
				<div>Anywhere</div>
				<div className="border-l border-gray-300"></div>
				<div>Any week</div>
				<div className="border-l border-gray-300"></div>
				<div>Add guests</div>
				<button className="bg-primary text-white p-2 rounded-full">
					<MagnifyingGlassIcon className="h-4 w-4" />
				</button>
			</div>
			<Link to={user ? "/account" : "/login"}>
				<div className="flex gap-2 items-center rounded-full py-2 px-4 border border-gray-300">
					<div>
						<Bars3Icon className="h-6 w-6" />
					</div>
					<div className="bg-gray-500 text-white p-1 rounded-full overflow-hidden">
						<UserIcon className="h-6 w-6 relative -bottom-1" />
					</div>
					{!!user && <div>{user.name}</div>}
				</div>
			</Link>
		</header>
	);
}
