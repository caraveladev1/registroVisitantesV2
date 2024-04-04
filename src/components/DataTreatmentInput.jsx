import React from "react";
import { useTranslation } from "react-i18next";

export function DataTreatmentInput() {
	const { t } = useTranslation();
	return (
		<div className="dataTreatmentContainer flex gap-2 bg-white p-2 ">
			<input required type="checkbox" />
			<span className="flex">
				<p className="mr-2">{t("dataTreatment")}</p>
				<a
					href="../staticfiles/DataTreatment.pdf"
					target="_blank"
					rel="noreferrer"
					className="text-orange"
				>
					{t("clickTermsConditions")}
				</a>
			</span>
		</div>
	);
}
