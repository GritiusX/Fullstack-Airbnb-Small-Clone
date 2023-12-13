import { Link, useLocation } from "react-router-dom";
import {
	UserIcon,
	BookOpenIcon,
	HomeModernIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function AccountNav() {
	let location = useLocation();
	let locationLength = location.pathname.split("/").length;
	let locationPath = location.pathname.split("/")?.[locationLength - 1];

	if (locationPath === "account") {
		locationPath = "profile";
	}
	let linkClasses = (type = null) => {
		let classes = "inline-flex gap-2 py-2 px-6 rounded-full";
		if (type === locationPath) {
			classes += " bg-primary text-white ";
		} else {
			classes += " bg-gray-200";
		}
		return classes;
	};
	return (
		<nav className="w-full flex justify-center my-8 gap-4 font-semibold">
			<Link className={linkClasses("profile")} to={"/account"}>
				<UserIcon className="h-6 w-6" />
				My profile
			</Link>
			<Link className={linkClasses("bookings")} to={"/account/bookings"}>
				<BookOpenIcon className="h-6 w-6" />
				My bookings
			</Link>
			<Link className={linkClasses("places")} to={"/account/places"}>
				<HomeModernIcon className="h-6 w-6" />
				My accomodations
			</Link>
		</nav>
	);
}

AccountNav.propTypes = {
	subpage: PropTypes.string,
};
