import {
	WifiIcon,
	TruckIcon,
	TvIcon,
	HandThumbUpIcon,
	InformationCircleIcon,
	RadioIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function Perks({ selected, onChange }) {
	const handleCheckboxClick = (ev) => {
		const { checked, name } = ev.target;
		if (checked) {
			onChange([...selected, name]);
		} else {
			onChange([...selected.filter((selectedName) => selectedName !== name)]);
		}
	};
	return (
		<>
			<div className="text-xl mt-4">
				Perks{" "}
				<span className="text-sm text-gray-500">
					(Please select all perks your accommodation has)
				</span>
				<div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-3">
					<label className="border p-4 rounded-2xl items-center flex gap-2">
						<input
							type="checkbox"
							checked={selected.includes("wifi")}
							name="wifi"
							onChange={handleCheckboxClick}
						/>
						<span className="flex items-center gap-2">
							Wifi <WifiIcon className="h-5 w-5" />
						</span>
					</label>
					<label className="border p-4 rounded-2xl items-center flex gap-2">
						<input
							type="checkbox"
							checked={selected.includes("parking")}
							name="parking"
							onChange={handleCheckboxClick}
						/>
						<span className="flex items-center gap-2">
							Free parking spot <TruckIcon className="h-5 w-5" />
						</span>
					</label>
					<label className="border p-4 rounded-2xl items-center flex gap-2">
						<input
							type="checkbox"
							checked={selected.includes("tv")}
							name="tv"
							onChange={handleCheckboxClick}
						/>
						<span className="flex items-center gap-2">
							Tv <TvIcon className="h-5 w-5" />
						</span>
					</label>
					<label className="border p-4 rounded-2xl items-center flex gap-2">
						<input
							type="checkbox"
							checked={selected.includes("pets")}
							name="pets"
							onChange={handleCheckboxClick}
						/>
						<span className="flex items-center gap-2">
							Pets <HandThumbUpIcon className="h-5 w-5" />
						</span>
					</label>
					<label className="border p-4 rounded-2xl items-center flex gap-2">
						<input
							type="checkbox"
							checked={selected.includes("privateEntrance")}
							name="privateEntrance"
							onChange={handleCheckboxClick}
						/>
						<span className="flex items-center gap-2">
							Private entrance
							<InformationCircleIcon className="h-5 w-5" />
						</span>
					</label>
					<label className="border p-4 rounded-2xl items-center flex gap-2">
						<input
							type="checkbox"
							checked={selected.includes("radio")}
							name="radio"
							onChange={handleCheckboxClick}
						/>
						<span className="flex items-center gap-2">
							Radio
							<RadioIcon className="h-5 w-5" />
						</span>
					</label>
				</div>
			</div>
		</>
	);
}
Perks.propTypes = {
	selected: PropTypes.array,
	onChange: PropTypes.func,
};
