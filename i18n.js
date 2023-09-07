// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa los archivos de traducción
import translationEN from "./src/translates/translatesEN.json";
import translationES from "./src/translates/translatesES.json";

i18n
	.use(initReactI18next) // conecta react-i18next con i18next
	.init({
		lng: "es", // idioma predeterminado (puedes cambiarlo)
		fallbackLng: "en", // idioma de reserva si la traducción no está disponible para el idioma actual
		debug: true, // activa los mensajes de depuración en la consola
		resources: {
			en: {
				translation: translationEN, // objetos de traducción para el idioma en inglés
			},
			es: {
				translation: translationES, // objetos de traducción para el idioma español
			},
		},
		interpolation: {
			escapeValue: false, // no escapar las cadenas traducidas para evitar problemas de seguridad
		},
	});

export default i18n;
