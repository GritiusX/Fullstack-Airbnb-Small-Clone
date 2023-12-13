import { useState } from "react";
import PropTypes from "prop-types";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import axios from "axios";

export default function BookingWidget({ placeDetail }) {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState(0);
	const [mainGuestName, setMainGuestName] = useState("");
	const [mainGuestPhone, setMainGuestPhone] = useState("");

	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	const handleBookingPlace = async () => {
		const data = {
			place: placeDetail?._id,
			checkIn,
			checkOut,
			guests: parseInt(guests),
			name: mainGuestName,
			phone: mainGuestPhone,
			price: numberOfNights * placeDetail?.price,
		};
		console.log(data);
		await axios.post("/bookings", data);
	};

	return (
		<div className="flex flex-col gap-4 w-1/3 border justify-evenly rounded-xl shadow-md p-4">
			<div className="text-2xl text-center">
				<p>
					<span className="font-semibold">${placeDetail?.price} USD </span>/ per
					night
				</p>
			</div>
			<div className="flex gap-4 w-full ">
				<div className="border p-2 rounded-lg w-1/2 ">
					<label htmlFor="checkIn">Check In time</label>
					<input
						className="cursor-pointer mt-2"
						type="date"
						value={checkIn}
						name="checkIn"
						id="checkIn"
						onChange={(ev) => setCheckIn(ev.target.value)}
					/>
				</div>
				<div className="border p-2 rounded-lg w-1/2 ">
					<label htmlFor="checkOut">Check Out time</label>
					<input
						className="cursor-pointer mt-2"
						type="date"
						value={checkOut}
						name="checkOut"
						id="checkOut"
						onChange={(ev) => setCheckOut(ev.target.value)}
					/>
				</div>
			</div>
			<div className="border p-2 rounded-lg w-full">
				<label htmlFor="numGuests">Number of guests</label>
				<input
					type="number"
					value={guests}
					name="numGuests"
					id="numGuests"
					max={placeDetail?.maxGuests}
					min={0}
					onChange={(ev) => setGuests(ev.target.value)}
				/>
			</div>
			{checkIn && checkOut && (
				<p className="font-semibold text-lg">
					Total to pay: ${numberOfNights * placeDetail?.price}
				</p>
			)}
			{guests > 0 && (
				<>
					<div className="border p-2 rounded-lg w-full">
						<label htmlFor="mainName">Your name:</label>
						<input
							type="text"
							value={mainGuestName}
							name="mainName"
							id="mainName"
							max={placeDetail?.maxGuests}
							min={0}
							onChange={(ev) => setMainGuestName(ev.target.value)}
						/>
					</div>
					<div className="border p-2 rounded-lg w-full">
						<label htmlFor="mainPhone">Your phone:</label>
						<input
							type="tel"
							value={mainGuestPhone}
							name="mainPhone"
							id="mainPhone"
							max={placeDetail?.maxGuests}
							min={0}
							onChange={(ev) => setMainGuestPhone(ev.target.value)}
						/>
					</div>
				</>
			)}
			<button
				onClick={() => handleBookingPlace()}
				disabled={!checkIn || !checkOut || !guests}
				className="w-full bg-primary py-4 rounded-xl disabled:bg-gray-400 text-white text-xl"
			>
				Book now!
			</button>
		</div>
	);
}
BookingWidget.propTypes = {
	placeDetail: PropTypes.object,
};
