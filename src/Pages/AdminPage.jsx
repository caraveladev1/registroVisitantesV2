import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AdminEditEmployee } from "../components/AdminEditEmployee";
import { AdminEditTransport } from "../components/AdminEditTransport";
import { AdminEditVisitor } from "../components/AdminEditVisitor";
import { AdminSelectorButton } from "../components/AdminSelectorButton";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";

export function AdminPage() {
	const { t } = useTranslation();
	return (
		<section className="bg-blue bg-contain min-h-screen">
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
			<div className="containerAdmin flex gap-20 mt-5">
				<aside className="flex flex-col max-w-xs ml-7  gap-4">
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
				<aside className="containerEditData">
					<AdminEditVisitor displayNone="" />
					<AdminEditEmployee displayNone="hidden" />
					<AdminEditTransport displayNone="hidden" />
				</aside>
			</div>
		</section>
	);
}
