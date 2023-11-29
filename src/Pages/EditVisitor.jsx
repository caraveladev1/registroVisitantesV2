import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";
import { LabelAdmin } from "../components/LabelAdmin";
import { formatISO } from "date-fns";
import { ButtonAdmin } from "../components/ButtonAdmin";
import { useNavigate } from "react-router-dom";

export function EditVisitor() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [fechaSalida, setFechaSalida] = useState(null);
		const [showAlert, setShowAlert] = useState(false);

	function reloadPage() {
		navigate("/AdminPage")
	}

	useEffect(() => {
		const apiVisitorEdit = `https://bckappvisitantes.azurewebsites.net/api/visitors/admin/edit/${id}`;
		fetch(apiVisitorEdit)
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
  // Obtener la fecha y hora en formato UTC directamente desde la cadena
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  const hours = dateString.slice(11, 13);
  const minutes = dateString.slice(14, 16);

  // Construir la cadena de fecha y hora en el formato deseado
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
}
	const exitDate = fechaSalida;
	const formattedExitDate = formatISO(new Date(exitDate));
	async function updateVisitorData(e) {
		e.preventDefault();
		const apiUpdatePost = `https://bckappvisitantes.azurewebsites.net/api/visitors/admin/edit/register/${id}`;
		try {
			const response = await fetch(apiUpdatePost, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: id,
					fecha_salida: formattedExitDate,
				}),
			});
			if (response.status === 200) {
				setShowAlert(true);
				alert("Registro guardado exitosamente");
				reloadPage();
			} else {
				setShowAlert(false); // Ocultar la alerta en caso de otro código de respuesta
			}
		} catch (error) {
			console.log(error);
		}
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
							value={data[0].fecha_ingreso.slice(0, -1)}
							ValidateEdit={true}
							typeInput={"datetime-local"}
						/>
					</div>
					<div className="w-full">
						<p>{t("exitDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="exitDateId"
							value={formatDate(fechaSalida)}
							ValidateEdit={false}
							onChange={(e) => {
								setFechaSalida(e.target.value);
							}}
							typeInput={"datetime-local"}
						/>
					</div>
					<div className="w-full">
						<ButtonAdmin
							typeInput={"Button"}
							idLabel="updateId"
							ValidateEdit={true}
							textButton={t("Update")}
							onClick={updateVisitorData}
							className=" bg-sunglo hover:bg-orange"
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
