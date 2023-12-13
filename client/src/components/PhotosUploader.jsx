import {
	ArrowUpTrayIcon,
	TrashIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

export default function PhotosUploader({ photos, onChange }) {
	const [photoLink, setPhotoLink] = useState("");

	const handlePhotoLink = (ev) => {
		ev.preventDefault();
		setPhotoLink(ev.target.value);
	};

	const uploadPhotoByLink = async (ev) => {
		ev.preventDefault();
		const { data: filename } = await axios.post("/upload-by-link", {
			link: photoLink,
		});

		onChange((prev) => {
			return [...prev, filename];
		});
		setPhotoLink("");
	};

	const uploadPhotoFile = async (ev) => {
		ev.preventDefault();
		const files = ev.target.files;
		const data = new FormData();

		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}

		const { data: filenames } = await axios.post("/upload", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		onChange((prev) => {
			return [...prev, ...filenames];
		});
	};
	const removePhoto = (ev, filename) => {
		ev.preventDefault();

		onChange([...photos.filter((photo) => photo !== filename)]);
	};
	const selectMainPhoto = (ev, filename) => {
		ev.preventDefault();
		const updatedPhotos = [
			filename,
			...photos.filter((photo) => photo !== filename),
		];
		onChange(updatedPhotos);
	};
	return (
		<>
			<h2 className="text-xl mt-4">
				Photos{" "}
				<span className="text-sm text-gray-500">(The more the merrier!)</span>
			</h2>
			<div className="py-2 rounded-2xl items-center flex gap-2">
				<input
					type="text"
					placeholder="Add photos using a link"
					value={photoLink}
					onChange={handlePhotoLink}
				/>
				<button
					className="bg-gray-200 px-4 rounded-2xl"
					onClick={uploadPhotoByLink}
					disabled={!photoLink}
				>
					Add photo
				</button>
			</div>
			<div className="h-44 mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{photos.length > 0 &&
					photos.map((link) => (
						<div key={link} className="flex h-40 relative">
							<img
								className="object-cover w-full rounded-2xl border-2"
								src={"http://localhost:4000/uploads/" + link}
								alt={link}
							/>
							<button
								onClick={(ev) => removePhoto(ev, link)}
								className="cursor-pointer absolute bottom-2 right-2 bg-red-500 text-white rounded-full p-2"
							>
								<TrashIcon className="h-6 w-6 " />
							</button>
							{link === photos[0] ? (
								<button
									onClick={(ev) => selectMainPhoto(ev, link)}
									className="cursor-pointer absolute bottom-2 left-2 bg-cyan-500 text-white rounded-full p-2"
								>
									<SolidStarIcon className="h-6 w-6 " />
								</button>
							) : (
								<button
									onClick={(ev) => selectMainPhoto(ev, link)}
									className="cursor-pointer absolute bottom-2 left-2 bg-cyan-500 text-white rounded-full p-2"
								>
									<StarIcon className="h-6 w-6 " />
								</button>
							)}
						</div>
					))}
				<label className="flex cursor-pointer h-40 justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
					<input
						type="file"
						className="hidden"
						name="uploadFotos"
						id="uploadFotos"
						multiple
						onChange={uploadPhotoFile}
					/>
					Upload <ArrowUpTrayIcon className="h-6 w-6" />
				</label>
			</div>
		</>
	);
}

PhotosUploader.propTypes = {
	photos: PropTypes.array,
	onChange: PropTypes.func,
};
