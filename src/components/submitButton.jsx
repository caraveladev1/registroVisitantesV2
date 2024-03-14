import React from "react";
import { useTranslation } from "react-i18next";

export function SubmitButton() {
	const { t } = useTranslation();
	return (
		<button
			className="l bg-sunglo hover:bg-orange text-brown  py-2  min-w-[80%] "
			type="submit"
		>
			{t("submit")}
		</button>
	);
}
