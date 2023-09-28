import React from "react";
import { useTranslation } from "react-i18next";

export function SubmitButton() {
	const { t } = useTranslation();
	return (
		<button
			className="rounded-full bg-sunglo hover:bg-orange text-white  py-2  min-w-[80%] "
			type="submit"
		>
			{t("submit")}
		</button>
	);
}
