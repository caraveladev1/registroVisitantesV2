import React from "react";

export function LabelAdmin({
	placeholder,
	onChange,
	idLabel,
	required,
	value,
	ValidateEdit,
	typeInput,
}) {
	return (
		<input
			type={typeInput}
			placeholder={placeholder}
			onChange={onChange}
			id={idLabel}
			className="p-2 border-2 border-black rounded-2xl w-full focus:outline-none "
			required={required}
			value={value}
			readOnly={ValidateEdit}
		/>
	);
}
