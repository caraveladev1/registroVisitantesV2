import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export function AdminEditTransport({ displayNone }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [transportData, setTransportData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedEntry, setSelectedEntry] = useState(null);
	useEffect(() => {
		const apiTransport = "http://localhost:1234/api/transports/dataEntry";
		fetch(apiTransport)
			.then((response) => response.json())
			.then((data) => {
				setTransportData(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);
	if (loading) {
		return (
			<span className="flex items-center gap-5">
				<h3 className="text-xl m-auto">Cargando Información</h3>
				<div className="bg-blue bg-contain ">
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
			</span>
		);
	}
	if (error) {
		return (
			<div className="bg-blue bg-contain min-h-screen flex justify-center items-center">
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (!transportData) {
		return (
			<div className="bg-blue bg-contain min-h-screen flex justify-center items-center">
				<p>No se encontraron datos.</p>
			</div>
		);
	}

	const handleEditClick = (transport) => {
		setSelectedEntry(transport);
		navigate(`/edit/transport/${transport.id}`);
	};
	return (
		<section className={displayNone} id="transportEntryAdminData">
			<h1 className="text-xl">{t("transportFormButton")}</h1>
			<table className="table-auto border-separate border-spacing-4 mt-5 bg-darkgray rounded-xl">
				<thead>
					<tr>
						<th className="border rounded-lg p-1">{t("cartaPorte")}</th>
						<th className="border rounded-lg p-1">{t("document")}</th>
						<th className="border rounded-lg p-1">{t("namePlaceHolder")}</th>
						<th className="border rounded-lg p-1">
							{t("lastNamePlaceHolder")}
						</th>
						<th className="border rounded-lg p-1">
							{t("entryDatePlaceHolder")}
						</th>
					</tr>
				</thead>
				<tbody className="">
					{transportData.map((transport) => (
						<tr key={transport.id}>
							<td className="border rounded-lg p-1">{transport.cpp}</td>
							<td className="border rounded-lg p-1">{transport.documento}</td>
							<td className="border rounded-lg p-1">{transport.nombres}</td>
							<td className="border rounded-lg p-1">{transport.apellidos}</td>
							<td className="border rounded-lg p-1">
								{transport.fecha_ingreso}
							</td>
							<td className="border rounded-lg p-1 border-gray">
								<button
									type="button"
									className="text-gray"
									onClick={() => handleEditClick(transport)}
								>
									editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
