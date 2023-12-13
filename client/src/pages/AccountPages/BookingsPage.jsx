import AccountNav from "../../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatISO } from "date-fns";

export default function BookingsPage() {
	const [bookings, setBookings] = useState();
	useEffect(() => {
		axios.get("/bookings").then(({ data }) => setBookings(data));
	}, []);
	return (
		<>
			<AccountNav />
			<div className="flex gap-4 flex-wrap">
				{bookings?.map((booking) => (
					<div
						className="flex flex-col gap-3 bg-gray-300 p-4"
						key={booking._id}
					>
						<h2>{booking.place.title}</h2>
						<p>Booked by: {booking.name}</p>
						<p>Contact number: {booking.phone}</p>
						<p>Amount of guests: {booking.guests}</p>
						<p>Total price: {booking.price}</p>
						<p>
							From:{" "}
							{formatISO(new Date(booking.checkIn), { representation: "date" })}
						</p>
						<p>
							To:{" "}
							{formatISO(new Date(booking.checkOut), {
								representation: "date",
							})}
						</p>
					</div>
				))}
			</div>
		</>
	);
}
