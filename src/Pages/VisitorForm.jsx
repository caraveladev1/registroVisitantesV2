import React from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { LabelInput } from "../components/LabelInput";
import { SelectInput } from "../components/SelectInput";
import { SubmitButton } from "../components/submitButton";

export function VisitorForm() {
	const { t } = useTranslation();
	return (
		<div className="containerVisitorForm p-5 bg-hero-pattern bg-cover">
			<h1 className="text-whiteText text-center text-4xl font-bold p-10 ">
				{t("visitorFormTitle")}
			</h1>
			<form action="submit" className="mb-5">
				<section className="visitor-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<span className="w-full">
						<h3 className="text-whiteText">{t("officePlaceHolder")}</h3>
						<SelectInput id="" />
					</span>
					<LabelInput id="" placeholder={t("documentPlaceHolder")} required />
					<LabelInput id="" placeholder={t("namePlaceHolder")} required />
					<LabelInput
						id=""
						placeholder={t("emergencyContactPlaceHolder")}
						required
					/>

					<LabelInput id="" placeholder={t("rhPlaceHolder")} required />
					<LabelInput
						id=""
						placeholder={t("visitingNamePlaceHolder")}
						required
					/>
					<span className="w-full">
						<h3 className="text-whiteText">{t("entryDatePlaceHolder")}</h3>
						<DateInput required />
					</span>
					<span className="w-full">
						<h3 className="text-whiteText">{t("exitDatePlaceHolder")}</h3>
						<DateInput required />
					</span>
					<DataTreatmentInput required />
					<SubmitButton />
				</section>
			</form>
		</div>
	);
}
