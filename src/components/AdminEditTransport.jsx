import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function AdminEditTransport({ displayNone }) {
	const { t } = useTranslation();
	const [transportData, setTransportData] = useState([]);
	useEffect(() => {
		const apiTransport = "http://localhost:1234/api/transports/dataEntry";
		fetch(apiTransport)
			.then((response) => response.json())
			.then((data) => setTransportData(data));
	}, []);
	return (
		<section className={displayNone} id="employeeEntryAdminData">
			<h1 className="text-xl">{t("transportFormButton")}</h1>
			<table className="table-auto border-separate border-spacing-4 mt-5 bg-darkgray rounded-xl">
				<thead>
					<tr>
						<th className="border rounded-lg p-1">Cartaporte</th>
						<th className="border rounded-lg p-1">Nombre</th>
						<th className="border rounded-lg p-1">Apellido</th>
						<th className="border rounded-lg p-1">Fecha de ingreso</th>
					</tr>
				</thead>
				<tbody className="">
					{transportData.map((transport) => (
						<tr key={transport.id}>
							<td className="border rounded-lg p-1">{transport.documento}</td>
							<td className="border rounded-lg p-1">{transport.nombres}</td>
							<td className="border rounded-lg p-1">{transport.apellidos}</td>
							<td className="border rounded-lg p-1">
								{transport.fecha_ingreso}
							</td>
							<td className="border rounded-lg p-1 border-gray">
								<a
									className="text-gray"
									href="
                #"
								>
									editar
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
