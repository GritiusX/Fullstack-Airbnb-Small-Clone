import { MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
	const [allPlaces, setAllPlaces] = useState([]);
	useEffect(() => {
		axios.get("/all-places").then((response) => {
			const { data } = response;
			setAllPlaces(data);
		});
	}, []);

	return (
		<>
			<div className="grid grid-cols-6 gap-5 min-h-[270px] min-w-[360px]">
				{allPlaces?.map((place) => (
					<Link to={"/place/" + place._id} key={place._id}>
						<div className="flex flex-col gap-3 w-full  bg-gray-50 border rounded-2xl p-4">
							<img
								className="rounded-xl"
								src={"http://localhost:4000/uploads/" + place?.photos[0]}
								alt={place._id}
							/>
							<div className="flex flex-col items-start w-full">
								<p className="font-semibold text-lg flex gap-2 items-center">
									<MapPinIcon className="h-6 w-6" /> {place.address}
								</p>
								<div className="my-2">
									<p className="font-medium text-xl mb-1">{place.title}</p>
									<p>{place.description}</p>
								</div>
								<div className="flex gap-2 w-full justify-between">
									<p className="flex gap-2 items-center">
										<UserGroupIcon className="h-6 w-6" /> {place.maxGuests}
									</p>
									<p>
										<span className="font-semibold">
											${""}
											{place.price} USD
										</span>{" "}
										a night
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
