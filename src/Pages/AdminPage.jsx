import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminEditEmployee } from "../components/AdminEditEmployee";
import { AdminEditTransport } from "../components/AdminEditTransport";
import { AdminEditVisitor } from "../components/AdminEditVisitor";
import { AdminSelectorButton } from "../components/AdminSelectorButton";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";
import { GeneralButton } from "../components/GeneralButton";
import { Link } from "react-router-dom";

export function AdminPage() {
	const { t } = useTranslation();
	const [selectedButton, setSelectedButton] = useState("employeeFormButton");

	const handleSelectorButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};

	return (
		<section className="bg-beige bg-contain min-h-screen">

			<div className="containerBanner bg-brown flex flex-row-reverse items-center gap-3">

				<>
					<div>
						<TranslateButton />
					</div>
					<div>
						<LogoutButton />
					</div>
				</>
				<div>
					<Link to="/" className="w-full flex items-center justify-center">
						<GeneralButton textBtn="BackHome" style="px-3" />
					</Link>
				</div>
			</div>
			<div>
				<h1 className="m-auto text-brown text-center p-5 text-2xl">
					{t("welcomeHomeAdmin")}
				</h1>
			</div>
			<div className="containerAdmin md:flex gap-20 mt-5">
				<aside className=" flex flex-col m-auto md:flex md:flex-col md:justify-start max-w-xs md:m-0 md:ml-7 gap-4 ">
					<AdminSelectorButton
						selectorView={() => handleSelectorButtonClick("employeeFormButton")}
						textButtonAdmin="employeeFormButton"
					/>

					<AdminSelectorButton
						selectorView={() => handleSelectorButtonClick("visitorFormButton")}
						textButtonAdmin="visitorFormButton"
					/>
					<AdminSelectorButton
						selectorView={() =>
							handleSelectorButtonClick("transportFormButton")
						}
						textButtonAdmin="transportFormButton"
					/>
				</aside>
				<main className=" md:block">
					{selectedButton === "employeeFormButton" && <AdminEditEmployee />}
					{selectedButton === "visitorFormButton" && <AdminEditVisitor />}
					{selectedButton === "transportFormButton" && <AdminEditTransport />}
				</main>
			</div>
		</section>
	);
}
