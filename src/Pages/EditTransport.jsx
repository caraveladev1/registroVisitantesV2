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
import { ImgInput } from "../components/ImgInput";
import "../index.css";

export function EditTransport() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [data, setData] = useState(null);
	const [fechaEntrada, setFechaEntrada] = useState(null);
	const [destino, setDestino] = useState(null);
	const [empTransport, setEmpTransport] = useState(null);
	const [numTrailer, setNumTrailer] = useState(null);
	const [origen, setOrigen] = useState(null);
	const [pesoIngreso, setPesoIngreso] = useState(null);
	const [pesoNeto, setPesoNeto] = useState(null);
	const [placa, setPlaca] = useState(null);
	const [precintos, setPrecintos] = useState(null);
	const [telefono, setTelefono] = useState(null);
	const [fechaSalida, setFechaSalida] = useState(null);
	const [pesoSalida, setPesoSalida] = useState(null);
	const [observaciones, setObservaciones] = useState(null);
	const [image, setImage] = useState(null);
	const [documento, setDocumento] = useState(null);

	function reloadPage() {
		navigate("/AdminPage");
	}

	useEffect(() => {
		const apiTransportEdit = `https://dsbckvisitantes2024.azurewebsites.net/api/transports/admin/edit/${id}`;
		fetch(apiTransportEdit)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				setFechaEntrada(data[0].fecha_ingreso);
				setDestino(data[0].destino);
				setEmpTransport(data[0].empresa_transp);
				setNumTrailer(data[0].num_trailer);
				setOrigen(data[0].origen);
				setPesoIngreso(data[0].peso_ingreso);
				setPesoNeto(data[0].peso_neto);
				setPlaca(data[0].placa);
				setPrecintos(data[0].precintos);
				setTelefono(data[0].telefono);
				setFechaSalida(data[0].fecha_salida);
				setPesoSalida(data[0].peso_salida);
				setObservaciones(data[0].observaciones);
				setImage(data[0].observaciones_img);
				setDocumento(data[0].documento);
				setLoading(false);
				//console.log(data);
				validateImg(data);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [id]);

	function validateImg(data) {
		if (data[0].observaciones_img !== null) {
			return (
				<div className="w-full">
					<ButtonAdmin
						typeInput={"Button"}
						idLabel="DownloadImageId"
						onClick={() => {
							window.open(data[0].observaciones_img);
						}}
						ValidateEdit={true}
						textButton={t("DownloadImage")}
						className=" bg-green hover:bg-green2"
					/>
				</div>
			);
		}
		return (
			<span className="w-full">
				<h3 className="text-beigeTextText  text-brown">{t("imgWeight")}</h3>
				<ImgInput
					type="file"
					id="EntryImgTransport"
					name="observaciones_img"
					onChange={(e) => {
						setImage(e.target.files[0]);
					}}
				/>
			</span>
		);
	}
	function validateEdit(data) {
		if (data[0].save_status !== "2") {
			return (
				<ButtonAdmin
					typeInput={"submit"}
					idLabel="updateId"
					ValidateEdit={true}
					textButton={t("Update")}
					onClick={updateTransportData}
					className=" bg-sunglo hover:bg-orange"
				/>
			);
		}
	}

	if (loading) {
		return (
			<div className=" min-h-screen flex justify-center items-center">
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
			<div className=" min-h-screen flex justify-center items-center">
				<p>Error: No existe ningun registro con ese id</p>
			</div>
		);
	}
	if (!data) {
		return (
			<div className=" min-h-screen flex justify-center items-center">
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
	const currentDate = formatISO(new Date());
	//const formattedExitDate = formatISO(new Date(exitDate));

	const save_status = "2";
	async function updateTransportData(e) {
		e.preventDefault();
		const apiUpdatePost = `https://dsbckvisitantes2024.azurewebsites.net/api/transports/admin/edit/register/${id}`;

		const formData = new FormData();
		formData.append("fecha_salida", exitDate);
		formData.append("peso_salida", pesoSalida);
		formData.append("observaciones", observaciones);
		formData.append("save_status", save_status);
		formData.append("documento", documento);
		formData.append("telefono", telefono);
		formData.append("empresa_transp", empTransport);
		formData.append("peso_ingreso", pesoIngreso);
		formData.append("placa", placa);
		formData.append("origen", origen);
		formData.append("destino", destino);
		formData.append("fecha_transfer", currentDate);
		formData.append("precintos", precintos);
		formData.append("num_trailer", numTrailer);
		formData.append("peso_neto", pesoNeto);
		formData.append("id", id);
		formData.append("observaciones_img", image);

		try {
			const response = await fetch(apiUpdatePost, {
				method: "PUT",
				body: formData,
			});
			if (response.status === 200) {
				setShowAlert(true);
				alert("Registro guardado exitosamente");
				console.log(Object.fromEntries(formData.entries()));

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
			<div className="containerBanner bg-brown flex flex-row-reverse items-center gap-3">
				<div>
					<TranslateButton />
				</div>
				<div>
					<LogoutButton />
				</div>
			</div>
			<main className="bg-beige bg-contain min-h-screen p-5 ">
				<div className="containerResults flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<div className="w-full">
						<p className="text-brown">{t("cartaPorte")}</p>
						<LabelAdmin
							idLabel="cartaPorteId"
							value={data[0].cpp}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("documentPlaceHolder")}</p>
						<LabelAdmin
							idLabel="documentId"
							value={data[0].documento}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("namePlaceHolder")}</p>
						<LabelAdmin
							idLabel="nameId"
							value={data[0].nombres}
							ValidateEdit={true}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("lastNamePlaceHolder")}</p>
						<LabelAdmin
							idLabel="lastNameId"
							value={data[0].apellidos}
							ValidateEdit={true}
						/>
					</div>

					<div className="w-full">
						<p className="text-brown">{t("phone")}</p>
						<LabelAdmin
							idLabel="phoneId"
							value={telefono}
							onChange={(e) => {
								setTelefono(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("transportCompany")}</p>
						<LabelAdmin
							idLabel="empTranspId"
							value={empTransport}
							onChange={(e) => {
								setEmpTransport(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("entryNetWeight")}</p>
						<LabelAdmin
							idLabel="entryNetWeightId"
							value={pesoIngreso}
							onChange={(e) => {
								setPesoIngreso(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("netWeight")}</p>
						<LabelAdmin
							idLabel="netWeightId"
							value={pesoNeto}
							onChange={(e) => {
								setPesoNeto(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("exitNetWeight")}</p>
						<LabelAdmin
							idLabel="exitNetWeightId"
							value={pesoSalida}
							onChange={(e) => {
								setPesoSalida(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("plate")}</p>
						<LabelAdmin
							idLabel="plateId"
							value={placa}
							onChange={(e) => {
								setPlaca(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("origin")}</p>
						<LabelAdmin
							idLabel="originId"
							value={origen}
							onChange={(e) => {
								setOrigen(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("Destination")}</p>
						<LabelAdmin
							idLabel="DestinationId"
							value={destino}
							onChange={(e) => {
								setDestino(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("Precintos")}</p>
						<LabelAdmin
							idLabel="PrecintosId"
							value={precintos}
							onChange={(e) => {
								setPrecintos(e.target.value);
							}}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("numTrailer")}</p>
						<LabelAdmin
							idLabel="numTrailerId"
							value={numTrailer}
							onChange={(e) => {
								setNumTrailer(e.target.value);
							}}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("entryDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="entryDatePlaceHolderId"
							value={fechaEntrada.slice(0, -1)}
							ValidateEdit={true}
							typeInput={"datetime-local"}
							onChange={(e) => {
								setFechaEntrada(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("exitDatePlaceHolder")}</p>
						<LabelAdmin
							idLabel="exitDatePlaceHolderId"
							value={fechaSalida}
							typeInput={"datetime-local"}
							onChange={(e) => {
								setFechaSalida(e.target.value);
							}}
							required={"required"}
						/>
					</div>
					<div className="w-full">
						<p className="text-brown">{t("observation")}</p>
						<LabelAdmin
							idLabel="observationId"
							value={observaciones}
							onChange={(e) => {
								setObservaciones(e.target.value);
							}}
						/>
					</div>
					{validateImg(data)}
					<div className="w-full">{validateEdit(data)}</div>
				</div>
			</main>
		</div>
	);
}
