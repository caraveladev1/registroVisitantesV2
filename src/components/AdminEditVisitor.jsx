import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function AdminEditVisitor({ displayNone }) {
	const { t } = useTranslation();
	const [visitorData, setVisitorData] = useState([]);
	useEffect(() => {
		const apiVisitor = "http://localhost:1234/api/visitors/dataEntry";
		fetch(apiVisitor)
			.then((response) => response.json())
			.then((data) => setVisitorData(data));
	}, []);
	return (
		<section id="employeeEntryAdminData" className={displayNone}>
			<h1 className="text-xl">{t("visitorFormButton")}</h1>
			<table className="table-auto border-separate border-spacing-4 mt-5 bg-darkgray rounded-xl">
				<thead>
					<tr>
						<th className="border rounded-lg p-1">Documento</th>
						<th className="border rounded-lg p-1">Nombre</th>
						<th className="border rounded-lg p-1">Fecha de ingreso</th>
					</tr>
				</thead>
				<tbody className="">
					{visitorData.map((visitor) => (
						<tr key={visitor.id}>
							<td className="border rounded-lg p-1">{visitor.documento}</td>
							<td className="border rounded-lg p-1">{visitor.nombre}</td>
							<td className="border rounded-lg p-1">{visitor.fecha_ingreso}</td>
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
