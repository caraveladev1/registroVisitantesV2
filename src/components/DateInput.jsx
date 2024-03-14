import React from "react";

export function DateInput({ dateId, required }) {
	return (
		<input
			type="datetime-local"
			className="p-2 border-2 border-brown w-full  focus:outline-none focus:border-orange mt-5 "
			id={dateId}
			required={required}
		/>
	);
}
