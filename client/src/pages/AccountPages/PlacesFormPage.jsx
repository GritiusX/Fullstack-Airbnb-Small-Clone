import Perks from "../../components/Perks";
import PhotosUploader from "../../components/PhotosUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import AccountNav from "../../components/AccountNav";

export default function PlacesFormPage() {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [price, setPrice] = useState(0);
	const [photos, setPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState("");
	const [redirecting, setRedirecting] = useState("");

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/user-only-places/" + id).then((response) => {
			const { data } = response;
			setTitle(data.title);
			setAddress(data.address);
			setPrice(data.price);
			setPhotos(data.photos);
			setDescription(data.description);
			setPerks(data.perks);
			setExtraInfo(data.extraInfo);
			setCheckIn(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
		});
	}, [id]);

	const handleTitle = (ev) => {
		setTitle(ev.target.value);
	};
	const handleAddress = (ev) => {
		setAddress(ev.target.value);
	};
	const handlePrice = (ev) => {
		setPrice(ev.target.value);
	};
	const handleDescription = (ev) => {
		setDescription(ev.target.value);
	};
	const handleExtraInfo = (ev) => {
		setExtraInfo(ev.target.value);
	};
	const handleCheckIn = (ev) => {
		setCheckIn(ev.target.value);
	};
	const handleCheckOut = (ev) => {
		setCheckOut(ev.target.value);
	};
	const handleMaxGuests = (ev) => {
		setMaxGuests(ev.target.value);
	};

	const savePlace = async (ev) => {
		ev.preventDefault();
		const placeData = {
			title,
			address,
			price,
			photos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
		};
		if (id) {
			await axios.put("/user-only-places", { id, ...placeData });
		} else {
			await axios.post("/user-only-places", placeData);
		}
		setRedirecting("/account/places");
	};

	if (redirecting) {
		return <Navigate to={redirecting} />;
	}

	return (
		<>
			<AccountNav />
			<form onSubmit={savePlace} action="" className="flex flex-col gap-2">
				<label className="text-xl mt-4" htmlFor="title">
					Title{" "}
					<span className="text-sm text-gray-500">(Choose a catchy title)</span>
					<input
						type="text"
						id="title"
						value={title}
						placeholder="Title"
						onChange={handleTitle}
					/>
				</label>
				<label className="text-xl mt-4" htmlFor="adress">
					Address{" "}
					<span className="text-sm text-gray-500">
						(Give the location of your accomodation)
					</span>
					<input
						type="text"
						id="address"
						value={address}
						placeholder="Address"
						onChange={handleAddress}
					/>
				</label>
				<PhotosUploader photos={photos} onChange={setPhotos} />
				<label className="text-xl mt-4" htmlFor="description">
					Description{" "}
					<span className="text-sm text-gray-500">
						(Please describe as much as possible)
					</span>
					<textarea
						id="description"
						value={description}
						placeholder="Description"
						onChange={handleDescription}
					/>
				</label>
				<Perks selected={perks} onChange={setPerks} />
				<label className="text-xl mt-4" htmlFor="extraInfo" value>
					Extra Info{" "}
					<span className="text-sm text-gray-500">
						(House rules, extra fees, etc.)
					</span>
					<textarea
						name="extraInfo"
						value={extraInfo}
						id="extraInfo"
						placeholder="No pets allowed, dirty/broken household things must be somewhere specific, etc"
						onChange={handleExtraInfo}
					/>
				</label>
				<label className="text-xl mt-4" htmlFor="checkInOutAndGuests">
					Check in/ check out time & max guests{" "}
					<span className="text-sm text-gray-500">
						(Please, specify a time and guests to check)
					</span>
					<div className="grid sm:grid-cols-4 mt-3 gap-3">
						<div>
							<h3>Price</h3>
							<input
								className="mt-2"
								type="text"
								value={price}
								placeholder="50"
								onChange={handlePrice}
							/>
						</div>
						<div>
							<h3>Check in time</h3>
							<input
								className="mt-2"
								type="text"
								value={checkIn}
								placeholder="09"
								onChange={handleCheckIn}
							/>
						</div>
						<div>
							<h3>Check out time</h3>
							<input
								className="mt-2"
								type="text"
								value={checkOut}
								placeholder="14"
								onChange={handleCheckOut}
							/>
						</div>
						<div>
							<h3>Max num of guests</h3>
							<input
								className="mt-2"
								type="number"
								value={maxGuests}
								placeholder="3"
								onChange={handleMaxGuests}
							/>
						</div>
					</div>
				</label>
				<button className="primary my-4">Save</button>
			</form>
		</>
	);
}
