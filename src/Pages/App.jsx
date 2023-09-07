import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LoginButton } from "../components/LoginButton";
import { TranslateButton } from "../components/TranslateButton";
export default function App() {
	const { t } = useTranslation();

	return (
		<div className="generalContainer min-h-screen bg-[url('/img/BackgroundMain.svg')] bg-cover m-auto">
			<TranslateButton />
			<div className="headerContainer w-full">
				<h1 className="title  text-center text-4xl font-bold text-white bg-transparent">
					{t("welcomeHome")}
				</h1>
			</div>
			<div className="appContainer mt-20 ml-10 mr-10 items-center  grid grid-cols-3 m-auto ">
				<div className="btnContainerHome m-auto flex justify-center flex-col gap-5  items-center w-full col-span-1">
					<span className="w-full">
						<Link to="/VisitorForm">
							{" "}
							<button
								to="/VisitorForm"
								type="button"
								className="btnVisitorForm p-5 border-solid border-2 border-yellow2 rounded-xl bg-yellow hover:bg-yellow2 text-xl transform transition-transform hover:scale-110 w-full font-nunito"
							>
								{t("visitorFormButton")}
							</button>
						</Link>
					</span>
					<span className="w-full">
						<Link to="/EmployeeForm">
							{" "}
							<button
								type="button"
								className="btnEmployeeForm p-5 border-solid border-2 border-yellow2 rounded-xl bg-yellow hover:bg-yellow2 text-xl transform transition-transform hover:scale-110 w-full"
							>
								{t("employeeFormButton")}
							</button>
						</Link>
					</span>
					<span className="w-full">
						<Link to="/TransportForm">
							{" "}
							<button
								type="button"
								className="btnTransportForm p-5 border-solid border-2 border-yellow2 rounded-xl bg-yellow hover:bg-yellow2 text-xl transform transition-transform hover:scale-110 w-full"
							>
								{t("transportFormButton")}
							</button>
						</Link>
					</span>
					<span>
						<Link to="/Login">
							<LoginButton />
						</Link>
					</span>
				</div>
				<div className="imgContainer flex justify-center items-center w-full col-span-2">
					<img
						className="w-full"
						src="/img/ImgHome.webp"
						alt="Imagen de la página principal"
					/>
				</div>
			</div>
		</div>
	);
}
