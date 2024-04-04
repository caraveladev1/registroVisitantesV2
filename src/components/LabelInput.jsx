import React from "react";

export function LabelInput({
	placeholder,
	onChange,
	idLabel,
	required,
	value,
	type
}) {
	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			id={idLabel}
			type={type}
			className="p-2 border-2 border-brown  w-full focus:outline-none focus:border-orange  text-brown"
			required={required}
			value={value}
		/>
	);
}
