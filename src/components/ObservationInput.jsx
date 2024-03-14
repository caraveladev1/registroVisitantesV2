import React from "react";

export function ObservationInput({ placeholder, idInput }) {
	return (
		<input
			id={idInput}
			type="textarea"
			className="p-2 border-2 border-brown  w-full  focus:outline-none focus:border-orange mt-5 "
			placeholder={placeholder}
		/>
	);
}
