import { formatISO, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { ButtonAdmin } from "../components/ButtonAdmin";
import { LogoutButton } from "../components/LogoutButton";
import { TranslateButton } from "../components/TranslateButton";
import { LabelAdmin } from "../components/LabelAdmin";
import { useNavigate } from "react-router-dom";
import "../index.css"

export function EditTransport() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [fechaSalida, setFechaSalida] = useState(null);
	const [pesoSalida, setPesoSalida] = useState(null);
	const [observaciones, setObservaciones] = useState(null)
	const [showAlert, setShowAlert] = useState(false);

	function reloadPage() {
		navigate("/AdminPage")
	}

	useEffect(() => {
		const apiTransportEdit = `https://bckappvisitantes.azurewebsites.net/api/transports/admin/edit/${id}`;
		fetch(apiTransportEdit)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				setFechaSalida(data[0].fecha_salida);
				setPesoSalida(data[0].peso_salida);
				setObservaciones(data[0].observaciones);
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
	//const formattedExitDate = formatISO(new Date(exitDate));

	async function updateTransportData(e) {
		e.preventDefault();
		const apiUpdatePost = `https://bckappvisitantes.azurewebsites.net/api/transports/admin/edit/register/${id}`;
		try {
			const response = await fetch(apiUpdatePost, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: id,
					fecha_salida: exitDate,
					peso_salida: pesoSalida,
					observaciones: observaciones
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
						<p>{t("cartaPorte")}</p>
						<LabelAdmin
							idLabel="cartaPorteId"
							value={data[0].cpp}
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
							value={data[0].nombres}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("lastNamePlaceHolder")}</p>
						<LabelAdmin
							idLabel="lastNameId"
							value={data[0].apellidos}
							ValidateEdit={true}
						/>
					</div>

					<div className="w-full">
						<p>{t("phone")}</p>
						<LabelAdmin
							idLabel="phoneId"
							value={data[0].telefono}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("transportCompany")}</p>
						<LabelAdmin
							idLabel="empTranspId"
							value={data[0].empresa_transp}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("entryNetWeight")}</p>
						<LabelAdmin
							idLabel="entryNetWeightId"
							value={data[0].peso_ingreso}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("netWeight")}</p>
						<LabelAdmin
							idLabel="netWeightId"
							value={data[0].peso_neto}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("exitNetWeight")}</p>
						<LabelAdmin
							idLabel="exitNetWeightId"
							value={pesoSalida}
							ValidateEdit={false}
							onChange={(e) => {
								setPesoSalida(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p>{t("plate")}</p>
						<LabelAdmin
							idLabel="plateId"
							value={data[0].placa}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("origin")}</p>
						<LabelAdmin
							idLabel="originId"
							value={data[0].origen}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("Destination")}</p>
						<LabelAdmin
							idLabel="DestinationId"
							value={data[0].destino}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("Precintos")}</p>
						<LabelAdmin
							idLabel="PrecintosId"
							value={data[0].precintos}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("numTrailer")}</p>
						<LabelAdmin
							idLabel="numTrailerId"
							value={data[0].num_trailer}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p>{t("entryDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="entryDatePlaceHolderId"
							value={data[0].fecha_ingreso.slice(0, -1)}
							ValidateEdit={true}
							typeInput={"datetime-local"}
						/>
					</div>
					<div className="w-full">
						<p>{t("exitDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="exitDatePlaceHolderId"
							value={fechaSalida}
							ValidateEdit={false}
							typeInput={"datetime-local"}
							onChange={(e) => {
								setFechaSalida(e.target.value);
								
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p>{t("observation")}</p>
						<LabelAdmin
							idLabel="observationId"
							value={observaciones}
							ValidateEdit={false}
							onChange={(e) => {
								setObservaciones(e.target.value);
							}}
							required={"required"}
						/>
						
					</div>
					<div className="w-full">
						<ButtonAdmin
							typeInput={"Button"}
							idLabel="DownloadImageId"
							onClick={() => {
								window.open(data[0].observaciones_img);
							}}
							ValidateEdit={true}
							textButton={t("DownloadImage")}
							className=" bg-yellow hover:bg-yellow2"
						/>
					</div>
					<div className="w-full">
						<ButtonAdmin
							typeInput={"Button"}
							idLabel="updateId"
							ValidateEdit={true}
							textButton={t("Update")}
							onClick={updateTransportData}
							className=" bg-sunglo hover:bg-orange"
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
