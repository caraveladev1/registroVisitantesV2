import React from "react";
import { useTranslation } from "react-i18next";

export function DataTreatmentInput() {
	const { t } = useTranslation();
	return (
		<div className="dataTreatmentContainer flex gap-2 bg-white p-2 ">
			<input required type="checkbox" />
			<span className="flex">
				<p className="mr-2">{t("dataTreatment")}</p>
				<div className="flex flex-row gap-2">

				<a
					href="../staticfiles/DataTreatment.pdf"
					target="_blank"
					rel="noreferrer"
					className="text-orange"
					>
					{t("clickTermsConditions")}
				</a>
				<p>y </p> 
				<a
					href="../staticfiles/NDA_visitors.pdf"
					target="_blank"
					rel="noreferrer"
					className="text-orange"
					>
					{t("clickTermsConditions2")}
				</a>
					</div>
			</span>
		</div>
	);
}
