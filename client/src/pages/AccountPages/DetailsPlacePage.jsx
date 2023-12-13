import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import BookingWidget from "../../components/BookingWidget";

export default function DetailsPlacePage() {
	const { id } = useParams();
	const [placeDetail, setPlaceDetail] = useState(null);
	const [username, setUsername] = useState(null);
	const [showPhotos, setShowPhotos] = useState(false);
	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/place-by-id/${id}`).then((response) => {
			const { data } = response;
			setPlaceDetail(data);
		});
		axios.get("/profile").then((response) => {
			const { name } = response.data;
			setUsername(name);
		});
	}, [id]);
	const maxPhotosToShow = 5;

	const toggleShowPhotos = (ev) => {
		ev.preventDefault();
		setShowPhotos(!showPhotos);
	};

	if (showPhotos) {
		return (
			<div className="relative bg-gray-300 rounded-2xl">
				<div className="flex w-full p-8 justify-center flex-wrap gap-8">
					{placeDetail?.photos?.map((photo) => (
						<div className="rounded-2xl " key={photo}>
							<img
								className="object-cover w-[800px] h-[800px] rounded-lg"
								src={`http://localhost:4000/uploads/${photo}`}
								alt={photo}
							/>
						</div>
					))}
				</div>
				<span
					className="absolute right-4 p-2 top-4 rounded-full cursor-pointer bg-gray-500"
					onClick={(ev) => toggleShowPhotos(ev)}
				>
					<XMarkIcon className="h-6 w-6 text-white" />
				</span>
			</div>
		);
	}

	return (
		<>
			<div className="w-[60%] mx-auto relative">
				<div className="flex flex-col mb-6 gap-1">
					<h2 className="text-3xl mb-1 font-semibold">{placeDetail?.title}</h2>
					<p className="flex gap-2 underline font-medium">
						<MapPinIcon className="h-6 w-6" />
						{placeDetail?.address}
					</p>
				</div>
				<div className="flex gap-2">
					<div className="w-1/2 h-[600px] ">
						{placeDetail?.photos?.map(
							(photo, index) =>
								index === 0 && (
									<img
										className="object-cover w-full h-full rounded-2xl"
										key={photo}
										src={`http://localhost:4000/uploads/${photo}`}
										alt={photo}
									/>
								)
						)}
					</div>
					<div className="w-1/2 max-h-[600px] grid grid-cols-2 grid-rows-2 gap-2 relative ">
						{placeDetail?.photos?.slice(1, maxPhotosToShow).map((photo) => (
							<div
								key={photo}
								className="row-span-1 min-w-[250px] min-h-[250px]"
							>
								<img
									className="object-cover w-full h-full rounded-2xl"
									src={`http://localhost:4000/uploads/${photo}`}
									alt={photo}
								/>
							</div>
						))}
						{placeDetail?.photos?.length > maxPhotosToShow && (
							<button
								onClick={(ev) => toggleShowPhotos(ev)}
								className="font-medium absolute bg-gray-300 py-2 px-4 rounded-full bottom-2 right-3"
							>
								Show All Photos
							</button>
						)}
					</div>
				</div>
				<div className="flex gap-8 mt-8">
					<div className="flex flex-col gap-3 w-2/3 p-4 border-b">
						<h2 className="text-xl mb-4">{placeDetail?.description}</h2>
						<h2 className="text-xl font-medium">Host name: {username}</h2>
						<div className="flex justify-between">
							<p className="text-xl font-normal">
								Max number of guests: {placeDetail?.maxGuests}
							</p>
							<p className="text-xl font-normal">
								Check In time: {placeDetail?.checkIn}
							</p>
							<p className="text-xl font-normal">
								Check out time: {placeDetail?.checkOut}
							</p>
						</div>
						<p className="flex flex-col mt-4">
							<span className="font-medium text-xl">
								Extra information about the accommodation:
							</span>{" "}
							{placeDetail?.extraInfo}
						</p>
						<div className="">
							<h2 className="text-2xl">Perks offered here:</h2>
							<ul className="flex gap-8">
								{placeDetail?.perks.map((perk) => (
									<li key={perk}>{perk}</li>
								))}
							</ul>
						</div>
					</div>

					<BookingWidget placeDetail={placeDetail} />
				</div>
			</div>
		</>
	);
}
