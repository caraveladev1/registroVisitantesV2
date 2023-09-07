import React from "react";

export function ImgInput() {
	return (
		<input
			type="file"
			className="p-2 border-2 border-black rounded-2xl w-full  focus:outline-none focus:border-sky mt-5 bg-white"
			required
		/>
	);
}
