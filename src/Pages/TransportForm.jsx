import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { LabelInput } from "../components/LabelInput";
import { ObservationInput } from "../components/ObservationInput";
import { ImgInput } from "../components/imgInput";
import { SubmitButton } from "../components/submitButton";

export function TransportForm() {
	const { t } = useTranslation();

	const [cartaporte, setCartaporte] = useState("");

	console.log(cartaporte);

	async function getTransportData() {
		const transportApi = "http://localhost:1234/api/transports/data";
		try {
			await fetch(transportApi)
				.then((response) => response.json())
				.then((data) => {
					const transport = data.find(
						(item) => item.cpp === cartaporte.toUpperCase(),
					);

					if (transport) {
						document.getElementById("documentTransportist").value =
							transport.documento;
						document.getElementById("nameTransport").value =
							transport.name_driver;
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
				});
		} catch (error) {
			console.log(error);
		}
	}
	getTransportData();
	return (
		<div className="bg-transport-pattern bg-cover p-5">
			<h1 className="text-whiteText text-center text-4xl font-bold p-10 ">
				{t("entryTransport")}
			</h1>
			<form action="submit" className="">
				<section className="caravela-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<LabelInput
						idLabel="cartaporte"
						placeholder={t("cartaPorte")}
						onChange={(e) => {
							setCartaporte(e.target.value);
						}}
						value={cartaporte}
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
					<LabelInput
						idLabel="phoneTransport"
						placeholder={t("phone")}
						required={true}
					/>
					<LabelInput
						idLabel="TransportCompany"
						placeholder={t("transportCompany")}
						required={true}
					/>
					<LabelInput
						idLabel="netWeight"
						placeholder={t("netWeight")}
						required={true}
					/>
					<LabelInput
						idLabel="entryNetWeight"
						placeholder={t("entryNetWeight")}
						required={true}
					/>
					<LabelInput
						idLabel="exitNetWeight"
						placeholder={t("exitNetWeight")}
					/>
					<LabelInput
						idLabel="plateTransport"
						placeholder={t("plate")}
						required={true}
					/>
					<LabelInput
						idLabel="PrecintosTransport"
						placeholder={t("Precintos")}
						required={true}
					/>
					<LabelInput
						idLabel="originTransport"
						placeholder={t("origin")}
						required={true}
					/>
					<LabelInput
						idLabel="destinationTransport"
						placeholder={t("Destination")}
						required={true}
					/>
					<span className="w-full">
						<h3 className="text-whiteText">{t("entryDatePlaceHolder")}</h3>
						<DateInput required={true} />
					</span>
					<span className="w-full">
						<h3 className="text-whiteText">{t("exitDatePlaceHolder")}</h3>
						<DateInput />
					</span>
					<span className="w-full">
						<h3 className="text-whiteText">{t("imgWeight")}</h3>
						<ImgInput required={true} />
					</span>
					<ObservationInput
						idInput="observationTransport"
						placeholder={t("observation")}
					/>
					<DataTreatmentInput />
					<SubmitButton />
				</section>
			</form>
		</div>
	);
}
