import React from "react";
import { useTranslation } from "react-i18next";

export function SubmitButton({ disabled = false }) {
	const { t } = useTranslation();
	return (
		<button
			className={`l bg-sunglo hover:bg-orange text-brown py-2 min-w-[80%] ${disabled ? "opacity-60 cursor-not-allowed hover:bg-sunglo" : ""}`}
			type="submit"
			disabled={disabled}
		>
			{t("submit")}
		</button>
	);
}
