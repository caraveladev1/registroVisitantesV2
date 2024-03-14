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
		const apiTransport = "https://bckappvisitantes.azurewebsites.net/api/transports/dataEntry";
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
				<div className="bg-transparent bg-contain ">
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
			<div className="bg-beige bg-contain min-h-screen flex justify-center items-center">
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (!transportData) {
		return (
			<div className="bg-beige bg-contain min-h-screen flex justify-center items-center">
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
			<h1 className="text-xl text-center mt-5 md:text-start md:mt-0 text-brown">
				{t("transportFormButton")}
			</h1>
			<table className="table-auto border-separate border-spacing-4 mt-5 bg-gray ">
				<thead>
					<tr>
						<th className="border text-brown p-1">{t("cartaPorte")}</th>
						<th className="hidden border  p-1 text-brown">
							{t("documentPlaceHolder")}
						</th>
						<th className="hidden border  p-1 text-brown">
							{t("namePlaceHolder")}
						</th>
						<th className="hidden border  p-1 text-brown">
							{t("lastNamePlaceHolder")}
						</th>
						<th className="border text-brown  p-1">
							{t("entryDatePlaceHolder")}
						</th>
					</tr>
				</thead>
				<tbody className="">
					{transportData.map((transport) => (
						<tr key={transport.id}>
							<td className="border text-brown p-1">{transport.cpp}</td>
							<td className="hidden border  p-1 ">
								<p className="text-brown">
									{transport.documento}
								</p>
							</td>
							<td className="hidden border  p-1">
								<p className=" text-brown">
									{transport.nombres}
								</p>
							</td>
							<td className="hidden border  p-1">
								<p className=" text-brown">
									{transport.apellidos}
								</p>
							</td>
							<td className="border  p-1 ">
								<p className=" text-brown">
									{transport.fecha_ingreso}
								</p>
							</td>
							<td className="border  p-1 border-brown text-brown">
								<button
									type="button"
									className="text-brown"
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
