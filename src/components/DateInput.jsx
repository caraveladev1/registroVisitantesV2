import React from "react";

export function DateInput({ dateId, required }) {
	return (
		<input
			type="datetime-local"
			className="p-2 border-2 border-black rounded-2xl w-full  focus:outline-none focus:border-sky mt-5 "
			id={dateId}
			required={required}
		/>
	);
}
