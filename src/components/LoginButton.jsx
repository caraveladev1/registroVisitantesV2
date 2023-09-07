import React from "react";
import { useTranslation } from "react-i18next";

export function LoginButton() {
	const { t } = useTranslation(); // Desestructura el objeto para obtener la función t
	return (
		<div className="LoginButton-container flex justify-center m-auto items-center p-4 text-xl border-solid border-2 rounded-xl border-white bg-gray hover:bg-darkgray transform transition-transform hover:scale-110">
			<button className="underline-offset-4" type="button">
				{t("adminButton")}
			</button>
		</div>
	);
}
