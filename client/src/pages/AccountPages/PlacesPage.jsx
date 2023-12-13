import { Link, useParams } from "react-router-dom";
import {
	PlusCircleIcon,
	MapPinIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../../components/AccountNav";

export default function AccountPlacesPage() {
	const { subpage, id } = useParams();
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios.get("/user-only-places").then(({ data }) => {
			setPlaces(data);
		});
	}, []);

	return (
		<>
			<AccountNav subpage={subpage} />
			{id !== "new" && (
				<>
					<div className="text-center my-8">
						<Link
							className="inline-flex gap-2 bg-primary text-white py-2 px-4 rounded-full"
							to={"/account/places/new"}
						>
							<PlusCircleIcon className="h-6 w-6" />
							Add new place
						</Link>
					</div>
					<div className="text-center">
						List of all your places:
						<div className="grid grid-cols-6 gap-3">
							{places.length > 0 &&
								places.map((place) => (
									<Link key={place._id} to={"/account/places/" + place._id}>
										<div
											key={place._id}
											className="flex flex-col gap-3 w-full bg-gray-50 border rounded-2xl p-4"
										>
											{place.photos.length > 0 && (
												<img
													className="rounded-xl"
													src={
														"http://localhost:4000/uploads/" + place?.photos[0]
													}
													alt={place?.id}
												/>
											)}
											<div className="flex flex-col items-start w-full">
												<p className="font-semibold text-lg flex gap-2 items-center">
													<MapPinIcon className="h-6 w-6" /> {place.address}
												</p>
												<div className="flex flex-col items-start my-2">
													<p className="font-medium">{place.title}</p>
													<p>{place.description}</p>
												</div>
												<div className="flex gap-2 w-full justify-between">
													<p className="flex gap-2 items-center">
														<UserGroupIcon className="h-6 w-6" />{" "}
														{place.maxGuests}
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
					</div>
				</>
			)}
		</>
	);
}
