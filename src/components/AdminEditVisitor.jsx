import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export function AdminEditVisitor({ displayNone }) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [visitorData, setVisitorData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedEntry, setSelectedEntry] = useState(null);
	useEffect(() => {
		const apiVisitor = "https://dsbckvisitantes2024.azurewebsites.net/api/visitors/dataEntry";
		fetch(apiVisitor)
			.then((response) => response.json())
			.then((data) => {
				setVisitorData(data);
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
				<div className=" bg-contain ">
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
			<div className=" bg-contain min-h-screen flex justify-center items-center">
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (!visitorData) {
		return (
			<div className=" bg-contain min-h-screen flex justify-center items-center">
				<p>No se encontraron datos.</p>
			</div>
		);
	}
	const handleEditClick = (visitor) => {
		setSelectedEntry(visitor);
		navigate(`/edit/visitor/${visitor.id}`);
	};
	return (
		<section id="visitorEntryAdminData" className={displayNone}>
			<h1 className="text-xl text-center text-brown mt-5 md:text-start md:mt-0">
				{t("visitorFormButton")}
			</h1>
			<table className="table-auto border-separate border-spacing-4 mt-5 bg-gray border border-darkgray">
				<thead>
					<tr>
						<th className="border text-brown p-1">Documento</th>
						<th className="hidden sm:block border text-brown p-1">Nombre</th>
						<th className="border text-brown p-1">Fecha de ingreso</th>
					</tr>
				</thead>
				<tbody className="">
					{visitorData.map((visitor) => (
						<tr key={visitor.id}>
							<td className="border text-brown p-1">{visitor.documento}</td>
							<td className="hidden sm:block border text-brown p-1">
								{visitor.nombre}
							</td>
							<td className="border text-brown p-1">{visitor.fecha_ingreso}</td>
							<td className="border text-brown p-1 border-brown">
								<button
									type="button"
									className="text-brown"
									onClick={() => handleEditClick(visitor)}
								>
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
