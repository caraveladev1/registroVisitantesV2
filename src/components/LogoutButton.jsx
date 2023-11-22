import { useNavigate } from 'react-router-dom';
import React from "react";
import { useTranslation } from "react-i18next";
import logoutImg from "/icons/Logout.svg"; // Importa la imagen correctamente

export function LogoutButton() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/Login")
	};

	return (
		<div className="logout flex justify-center items-center gap-1 ">
			<img src={logoutImg} alt="imagen de cierre de sesión" />
			<button type="button" onClick={handleLogout}>
				{t("Logout")}
			</button>
		</div>
	);
}
