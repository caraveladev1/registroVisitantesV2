import React from "react";
import { useTranslation } from "react-i18next";

export function ButtonAdmin({
	idLabel,
	className,
	typeInput,
	onClick,
	textButton,
}) {
	const { t } = useTranslation();
	return (
		<button
			type={typeInput}
			id={idLabel}
			className={`p-2 border-2  border-black rounded-2xl w-full focus:outline-none ${className}`}
			onClick={onClick}
		>
			{textButton}
		</button>
	);
}
