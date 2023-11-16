import { formatISO } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { LabelInput } from "../components/LabelInput";
import { SelectInput } from "../components/SelectInput";
import { SubmitButton } from "../components/submitButton";

export function VisitorForm() {
	const { t } = useTranslation();

	function reloadPage() {
		window.location.reload();
	}

	async function postVisitorData(e) {
		e.preventDefault();
		const postVisitorApi = "https://bckappvisitantes.azurewebsites.net/api/visitors/post/data";

		const currentDate = new Date().toISOString();

		const entryDate = document.getElementById("entryDateId").value;
		const exitDate = document.getElementById("exitDateId").value;

		const formattedEntryDate = formatISO(new Date(entryDate));
		const formattedExitDate = formatISO(new Date(exitDate));

		const confirmacion_entrada = document.getElementById("entryDateId").value
			? true
			: false;
		const confirmacion_salida = document.getElementById("exitDateId").value
			? true
			: false;

		try {
			const response = await fetch(postVisitorApi, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					oficina_pro: document.getElementById("country").value,
					documento: document.getElementById("documentId").value,
					nombre: document.getElementById("nameId").value,
					num_emergencia: document.getElementById("eContactId").value,
					rh: document.getElementById("rhId").value,
					funcionario_a_visitar: document.getElementById("vNameId").value,
					fecha_ingreso: formattedEntryDate,
					fecha_salida: formattedExitDate,
					fecha_transfer: currentDate,
					created_at: currentDate,
					updated_at: currentDate,
					confirmar_entrada: confirmacion_entrada,
					confirmar_salida: confirmacion_salida,
				}),
			});
			if (response.status === 200) {
				alert("Registro guardado exitosamente");
				reloadPage();
			} else {
				alert("¡Ups, algo salio mal!");
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="containerVisitorForm p-5 bg-hero-pattern bg-cover">
			<h1 className="text-whiteText text-center text-4xl font-bold p-10 ">
				{t("visitorFormTitle")}
			</h1>
			<form
				action="submit"
				onSubmit={(e) => postVisitorData(e)}
				className="mb-5"
			>
				<section className="visitor-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<span className="w-full">
						<h3 className="text-whiteText">{t("officePlaceHolder")}</h3>
						<SelectInput idSelect="country" />
					</span>
					<LabelInput
						idLabel="documentId"
						placeholder={t("documentPlaceHolder")}
						required
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
