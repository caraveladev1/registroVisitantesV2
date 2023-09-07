import React from "react";

const VisitorBackground = ({ children }) => {
	return (
		<div
			className="custom-background h-screen"
			style={{
				backgroundImage: 'url("/img/Backgroundform2.svg")',
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{children}
		</div>
	);
};

export default VisitorBackground;
