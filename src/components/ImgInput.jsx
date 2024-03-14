import React from "react";

export function ImgInput({ required, id, onChange, type, name }) {
	return (
		<input
			className="p-2 border-2 border-brown w-full focus:outline-none focus:border-orange mt-5 bg-white"
			type={type}
			name={name}
			required={required}
			id={id}
			onChange={onChange}
		/>
	);
}
