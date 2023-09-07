import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AdminSelectorButton } from "../components/AdminSelectorButton";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";

export function AdminPage() {
	const { t } = useTranslation();
	return (
		<section className="bg-blue h-screen">
			<div className="containerBanner bg-sky flex flex-row-reverse  items-center gap-3">
				<div className="">
					<TranslateButton />
				</div>
				<div className="">
					<LogoutButton />
				</div>
			</div>
			<main className=" ">
				<h1 className="m-auto text-center p-5 text-2xl">
					{t("welcomeHomeAdmin")}
				</h1>
			</main>
			<div className="containerAdmin">
				<aside className="flex flex-col max-w-xs ml-7 gap-4">
					<Link to="/">
						<AdminSelectorButton textButtonAdmin="employeeFormButton" />
					</Link>
					<Link to="/">
						<AdminSelectorButton textButtonAdmin="visitorFormButton" />
					</Link>
					<Link to="/">
						<AdminSelectorButton textButtonAdmin="transportFormButton" />
					</Link>
				</aside>
			</div>
		</section>
	);
}
