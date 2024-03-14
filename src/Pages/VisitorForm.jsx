import { formatISO } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { LabelInput } from "../components/LabelInput";
import { SelectInput } from "../components/SelectInput";
import { SubmitButton } from "../components/submitButton";
import { useNavigate } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

export function VisitorForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	function reloadPage() {
		navigate("/");
	}

	async function postVisitorData(e) {
		e.preventDefault();
		const loader = document.getElementById("loader");
		loader.style.display = "block";
		const postVisitorApi =
			"https://bckappvisitantes.azurewebsites.net/api/visitors/post/data";

		const currentDate = new Date().toISOString();

		const entryDate = document.getElementById("entryDateId").value;
		const exitDate = document.getElementById("exitDateId").value;

		const formattedEntryDate = formatISO(new Date(entryDate));

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
					fecha_salida: exitDate,
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
		} finally {
			// Ocultar el loader después de que la petición se complete (éxito o error)
			loader.style.display = "none";
		}
	}
	return (
		<div className="containerVisitorForm p-5 bg-beige ">
			<h1 className="text-brown text-center text-4xl font-bold p-10  ">
				{t("visitorFormTitle")}
			</h1>
			<form
				action="submit"
				onSubmit={(e) => postVisitorData(e)}
				className="mb-5"
			>
				<section className="visitor-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<span className="w-full">
						<h3 className="text-brown">{t("officePlaceHolder")}</h3>
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
						<h3 className="text-brown">{t("entryDatePlaceHolder")}</h3>
						<DateInput dateId="entryDateId" required />
					</span>
					<span className="w-full">
						<h3 className="text-brown">{t("exitDatePlaceHolder")}</h3>
						<DateInput dateId="exitDateId" />
					</span>
					<DataTreatmentInput required />
					<SubmitButton />
					<div
						id="loader"
						style={{ display: "none" }}
						className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/[.6] w-full h-full flex justify-center items-center z-50"
					>
						<div className="p-4 rounded-lg flex items-center justify-center flex-col w-full h-full">
							<TailSpin
								height="50"
								width="50"
								color="#fff"
								ariaLabel="tail-spin-loading"
								radius="1"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
							/>
							<p className="text-beigeText text-center ml-2">Cargando...</p>
						</div>
					</div>
				</section>
			</form>
		</div>
	);
}
