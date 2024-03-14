import React from "react";

export function SelectInput({ idSelect }) {
	const offices = [
		"Colombia",
		"Ecuador",
		"Peru",
		"Mexico",
		"Nicaragua",
		"El Salvador",
		"Guatemala",
	];

	return (
		<select
			className="p-2 border-2 border-brown  w-full focus:outline-none focus:border-orange mt-5 disabled selected"
			id={idSelect}
			required
		>
			{offices.map((office) => (
				<option key={office}>{office}</option>
			))}
		</select>
	);
}
