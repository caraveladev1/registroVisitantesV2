import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";
import { LabelAdmin } from "../components/labelAdmin";

export function EditEmployee() {
	const { t } = useTranslation();
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const apiEmployeeEdit = `http://localhost:1234/api/employee/admin/edit/${id}`;
		fetch(apiEmployeeEdit)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				setFechaSalida(data[0].fecha_salida);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return (
			<div className="bg-blue bg-contain min-h-screen flex justify-center items-center">
				<TailSpin
					height="50"
					width="50"
					color="#000000"
					ariaLabel="tail-spin-loading"
					radius="1"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			</div>
		);
	}
	if (error) {
		return (
			<div className="bg-blue bg-contain min-h-screen flex justify-center items-center">
				<p>Error: No existe ningun registro con ese id</p>
			</div>
		);
	}
	if (!data) {
		return (
			<div className="bg-blue bg-contain min-h-screen flex justify-center items-center">
				<p>No se encontraron datos.</p>
			</div>
		);
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}
	return (
		<div>
			<div className="containerBanner bg-sky flex flex-row-reverse items-center gap-3">
				<div>
					<TranslateButton />
				</div>
				<div>
					<LogoutButton />
				</div>
			</div>
			<main className="bg-blue bg-contain min-h-screen p-5 ">
				<div className="containerResults flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<div className="w-full">
						<p>{t("AdminOffice")}</p>
						<LabelAdmin
							idLabel="country"
							value={data[0].oficina_pro}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("documentPlaceHolder")}</p>
						<LabelAdmin
							idLabel="documentId"
							value={data[0].documento}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("namePlaceHolder")}</p>
						<LabelAdmin
							idLabel="nameId"
							value={data[0].nombre}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("emergencyContactPlaceHolder")}</p>
						<LabelAdmin
							idLabel="eContactId"
							value={data[0].num_emergencia}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("epsPlaceHolder")}</p>
						<LabelAdmin
							idLabel="epsId"
							value={data[0].prov_salud}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("arlPlaceHolder")}</p>
						<LabelAdmin
							idLabel="arlId"
							value={data[0].prov_salud_trabj}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("rhPlaceHolder")}</p>
						<LabelAdmin idLabel="rhId" value={data[0].rh} ValidateEdit={true} />
					</div>
					<div className="w-full">
						<p>{t("visitingNamePlaceHolder")}</p>
						<LabelAdmin
							idLabel="vNameId"
							value={data[0].funcionario_a_visitar}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("entryDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="entryDateId"
							value={formatDate(data[0].fecha_ingreso)}
							ValidateEdit={true}
							typeInput={"datetime-local"}
						/>
					</div>
					<div className="w-full">
						<p>{t("exitDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="exitDateId"
							value={formatDate(data[0].fecha_salida)}
							ValidateEdit={true}
							typeInput={"datetime-local"}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
