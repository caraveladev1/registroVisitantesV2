import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminEditEmployee } from "../components/AdminEditEmployee";
import { AdminEditTransport } from "../components/AdminEditTransport";
import { AdminEditVisitor } from "../components/AdminEditVisitor";
import { AdminSelectorButton } from "../components/AdminSelectorButton";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";

export function AdminPage() {
	const { t } = useTranslation();
	const [selectedButton, setSelectedButton] = useState("employeeFormButton");

	const handleSelectorButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
		console.log(`${buttonName} button clicked`);
	};

	return (
		<section className="bg-blue bg-contain min-h-screen">
			<div className="containerBanner bg-sky flex flex-row-reverse items-center gap-3">
				<div>
					<TranslateButton />
				</div>
				<div>
					<LogoutButton />
				</div>
			</div>
			<div>
				<h1 className="m-auto text-center p-5 text-2xl">
					{t("welcomeHomeAdmin")}
				</h1>
			</div>
			<div className="containerAdmin flex gap-20 mt-5">
				<aside className="flex flex-col max-w-xs ml-7 gap-4">
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
				<main>
					{selectedButton === "employeeFormButton" && <AdminEditEmployee />}
					{selectedButton === "visitorFormButton" && <AdminEditVisitor />}
					{selectedButton === "transportFormButton" && <AdminEditTransport />}
				</main>
			</div>
		</section>
	);
}
