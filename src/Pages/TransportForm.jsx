import { formatISO } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { ImgInput } from "../components/ImgInput";
import { LabelInput } from "../components/LabelInput";
import { ObservationInput } from "../components/ObservationInput";
import { SubmitButton } from "../components/submitButton";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export function TransportForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	function reloadPage() {
		navigate("/");
	}

	const [cartaporte, setCartaporte] = useState("");
	const [image, setImage] = useState(null);
	async function getTransportData() {
		const transportApi =
			"https://bckappvisitantes.azurewebsites.net/api/transports/data";
		try {
			const response = await fetch(transportApi);
			const data = await response.json();

			const transport = data.find(
				(item) => item.cpp === cartaporte.toUpperCase(),
			);

			if (transport) {
				document.getElementById("documentTransportist").value =
					transport.documento;
				document.getElementById("nameTransport").value = transport.name_driver;
				document.getElementById("lasNameTransport").value =
					transport.surname_driver;
				document.getElementById("phoneTransport").value =
					transport.phone_number;
				document.getElementById("TransportCompany").value =
					transport.company_name;
				document.getElementById("netWeight").value = transport.weight;
				document.getElementById("plateTransport").value = transport.placa;
				document.getElementById("PrecintosTransport").value =
					transport.precintos;
				document.getElementById("originTransport").value = transport.origin;
				document.getElementById("destinationTransport").value =
					transport.destination;
			}
		} catch (error) {
			console.log(error);
		}
	}
	getTransportData();

	async function postTransportData(e) {
		e.preventDefault();
		const loader = document.getElementById("loader");
		loader.style.display = "block";
		const postTransportDataApi =
			"https://bckappvisitantes.azurewebsites.net/api/transports/post/data";
		const currentDate = new Date().toISOString();
		const entryDate = document.getElementById("entryDateId").value;
		const exitDate = document.getElementById("exitDateId").value;
		const documentT = document.getElementById("documentTransportist").value;
		const nameTransportist = document.getElementById("nameTransport").value;
		const lastNameTransportist =
			document.getElementById("lasNameTransport").value;
		const phoneTransport = document.getElementById("phoneTransport").value;
		const TransportCompany = document.getElementById("TransportCompany").value;
		const entryNetWeight = document.getElementById("entryNetWeight").value;
		const plateTransport = document.getElementById("plateTransport").value;
		const originTransport = document.getElementById("originTransport").value;
		const destinationTransport = document.getElementById(
			"destinationTransport",
		).value;
		const PrecintosTransport =
			document.getElementById("PrecintosTransport").value;
		const cartaporte = document.getElementById("cartaporte").value;
		const numTrailer = document.getElementById("numTrailer").value;
		const observationTransport = document.getElementById(
			"observationTransport",
		).value;
		const netWeight = document.getElementById("netWeight").value;
		const exitNetWeight = document.getElementById("exitNetWeight").value;
		const save_status = "1";
		const formattedEntryDate = formatISO(new Date(entryDate));
		//const formattedExitDate = formatISO(new Date(exitDate));

		const formData = new FormData();
		formData.append("documento", documentT);
		formData.append("nombre", nameTransportist);
		formData.append("apellidos", lastNameTransportist);
		formData.append("telefono", phoneTransport);
		formData.append("empresa_transp", TransportCompany);
		formData.append("peso_ingreso", entryNetWeight);
		formData.append("placa", plateTransport);
		formData.append("origen", originTransport);
		formData.append("destino", destinationTransport);
		formData.append("fecha_ingreso", formattedEntryDate);
		formData.append("fecha_salida", exitDate);
		formData.append("fecha_transfer", currentDate);
		formData.append("precintos", PrecintosTransport);
		formData.append("cpp", cartaporte);
		formData.append("num_trailer", numTrailer);
		formData.append("observaciones", observationTransport);
		formData.append("peso_neto", netWeight);
		formData.append("peso_salida", exitNetWeight);
		formData.append("observaciones_img", image);
		formData.append("save_status", save_status);

		try {
			const response = await fetch(postTransportDataApi, {
				method: "POST",
				body: formData,
			});

			if (response.status === 200) {
				alert("Registro guardado exitosamente");
				reloadPage();
			} else {
				alert("¡Ups, algo salió mal!");
			}
		} catch (error) {
			console.log(error);
		} finally {
			// Ocultar el loader después de que la petición se complete (éxito o error)
			loader.style.display = "none";
		}
	}

	return (
		<div className="bg-beige p-5">
			<h1 className="text-beigeTextText text-center text-4xl font-bold p-10  text-brown">
				{t("entryTransport")}
			</h1>
			<form onSubmit={(e) => postTransportData(e)} className="">
				<section className="caravela-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<LabelInput
						idLabel="cartaporte"
						placeholder={t("cartaPorte")}
						onChange={(e) => {
							setCartaporte(e.target.value);
						}}
						value={cartaporte}
						required={true}
					/>
					<LabelInput
						idLabel="documentTransportist"
						placeholder={t("documentPlaceHolder")}
						required={true}
					/>
					<LabelInput
						idLabel="nameTransport"
						placeholder={t("namePlaceHolder")}
						required={true}
					/>
					<LabelInput
						idLabel="lasNameTransport"
						placeholder={t("lastNamePlaceHolder")}
						required={true}
					/>
					<LabelInput idLabel="phoneTransport" placeholder={t("phone")} />
					<LabelInput
						idLabel="TransportCompany"
						placeholder={t("transportCompany")}
					/>
					<LabelInput idLabel="netWeight" placeholder={t("netWeight")} />
					<LabelInput
						idLabel="entryNetWeight"
						placeholder={t("entryNetWeight")}
					/>
					<LabelInput
						idLabel="exitNetWeight"
						placeholder={t("exitNetWeight")}
					/>
					<LabelInput idLabel="plateTransport" placeholder={t("plate")} />
					<LabelInput idLabel="numTrailer" placeholder={t("numTrailer")} />
					<LabelInput
						idLabel="PrecintosTransport"
						placeholder={t("Precintos")}
					/>
					<LabelInput idLabel="originTransport" placeholder={t("origin")} />
					<LabelInput
						idLabel="destinationTransport"
						placeholder={t("Destination")}
					/>
					<span className="w-full">
						<h3 className="text-beigeTextText  text-brown">
							{t("entryDatePlaceHolder")}
						</h3>
						<DateInput dateId="entryDateId" required={true} />
					</span>
					<span className="w-full">
						<h3 className="text-beigeTextText  text-brown">
							{t("exitDatePlaceHolder")}
						</h3>
						<DateInput dateId="exitDateId" />
					</span>
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
					<ObservationInput
						idInput="observationTransport"
						placeholder={t("observation")}
					/>
					<DataTreatmentInput />
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
