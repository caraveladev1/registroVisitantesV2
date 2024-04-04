import React from "react";
import { useTranslation } from "react-i18next";

export function AdminSelectorButton({ textButtonAdmin, selectorView }) {
	const { t } = useTranslation();
	return (
		<button
			type="button"
			onClick={selectorView}
			className="btnVisitorForm p-5 border-solid border-2 border-green2  bg-green hover:bg-green2 text-xl transform transition-transform hover:scale-110 w-full font-nunito"
		>
			{t(textButtonAdmin)}
		</button>
	);
}
