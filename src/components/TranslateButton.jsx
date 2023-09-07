import React from "react";
import { useTranslation } from "react-i18next";

import englishFlag from "/img/EnglishTranslate.svg";
import spanishFlag from "/img/SpanishTranslate.svg";

export function TranslateButton() {
	const { t, i18n } = useTranslation();

	const changeLanguage = () => {
		const newLanguage = i18n.language === "en" ? "es" : "en";
		i18n.changeLanguage(newLanguage);
	};

	return (
		<div className="flex justify-end py-3 pr-3 items-end m-auto">
			<button type="button" className="w-12" onClick={changeLanguage}>
				<img
					src={i18n.language === "en" ? spanishFlag : englishFlag}
					alt={i18n.language === "en" ? "Español" : "English"}
				/>
			</button>
		</div>
	);
}
