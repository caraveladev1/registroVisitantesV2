import React from "react";

export function ImgInput({ required, id, onChange, type, name }) {
	return (
		<input
			className="p-2 border-2 border-black rounded-2xl w-full focus:outline-none focus:border-sky mt-5 bg-white"
			type={type}
			name={name}
			required={required}
			id={id}
			onChange={onChange}
		/>
	);
}
