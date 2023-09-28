import React from "react";

export function LabelInput({ placeholder, onChange, idLabel, required }) {
	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			id={idLabel}
			className="p-2 border-2 border-black rounded-2xl w-full focus:outline-none focus:border-sky"
			required={required}
		/>
	);
}
