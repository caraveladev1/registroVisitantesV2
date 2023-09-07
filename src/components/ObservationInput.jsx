import React from "react";

export function ObservationInput({ placeholder }) {
	return (
		<input
			type="textarea"
			className="p-2 border-2 border-black rounded-2xl w-full  focus:outline-none focus:border-sky mt-5 "
			placeholder={placeholder}
		/>
	);
}
