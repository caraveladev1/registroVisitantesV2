import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { LabelInput } from "../components/LabelInput";
import { SelectInput } from "../components/SelectInput";
import { SubmitButton } from "../components/submitButton";

export function EmployeeForm() {
	const { t } = useTranslation();
	const [documentNumber, setDocumentNumber] = useState("");

	console.log(documentNumber);

	async function getEmployeeData() {
		const employeeApi = "http://localhost:1234/api/employee/data";
		try {
			await fetch(employeeApi)
				.then((response) => response.json())
				.then((data) => {
					const employee = data.find(
						(item) => item.Numero_de_documento === documentNumber,
					);
					if (employee) {
						document.getElementById("nameId").value = employee.nombre;
						document.getElementById("eContactId").value =
							employee.numero_de_contacto_de_emergencia;
						document.getElementById("epsId").value =
							employee.empresa_prestadora_de_salud;
						document.getElementById("arlId").value =
							employee.empresa_prestadora_de_salud_laboral;
						document.getElementById("rhId").value = employee.rh;
					}
				});
		} catch (error) {
			console.log(error);
		}
	}
	getEmployeeData();

	return (
		<div className="bg-visitor-pattern p-5 bg-cover">
			<h1 className="text-whiteText text-center text-4xl font-bold p-10 ">
				{t("employeeFormTitle")}
			</h1>
			<form action="submit">
				<section className="caravela-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<span className="w-full">
						<h3 className="text-whiteText">{t("officePlaceHolder")}</h3>
						<SelectInput idSelect="country" />
					</span>
					<LabelInput
						idLabel="documentId"
						placeholder={t("documentPlaceHolder")}
						required
						onChange={(e) => {
							setDocumentNumber(e.target.value);
						}}
						value={documentNumber}
					/>
					<LabelInput
						idLabel="nameId"
						placeholder={t("namePlaceHolder")}
						required
					/>
					<LabelInput
						idLabel="eContactId"
						placeholder={t("emergencyContactPlaceHolder")}
						required
					/>
					<LabelInput
						idLabel="epsId"
						placeholder={t("epsPlaceHolder")}
						required
					/>
					<LabelInput
						idLabel="arlId"
						placeholder={t("arlPlaceHolder")}
						required
					/>
					<LabelInput
						idLabel="rhId"
						placeholder={t("rhPlaceHolder")}
						required
					/>
					<LabelInput
						idLabel="vNameId"
						placeholder={t("visitingNamePlaceHolder")}
						required
					/>
					<span className="w-full">
						<h3 className="text-whiteText">{t("entryDatePlaceHolder")}</h3>
						<DateInput dateId="entryDateId" required />
					</span>
					<span className="w-full">
						<h3 className="text-whiteText">{t("exitDatePlaceHolder")}</h3>
						<DateInput dateId="exitDateId" required />
					</span>
					<DataTreatmentInput required />
					<SubmitButton />
				</section>
			</form>
		</div>
	);
}
