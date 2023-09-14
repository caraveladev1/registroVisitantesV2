import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function AdminEditEmployee({ displayNone }) {
	const { t } = useTranslation();
	const [entryData, setEntryData] = useState([]);
	useEffect(() => {
		const apiEmployee = "http://localhost:1234/api/employee/dataEntry";
		fetch(apiEmployee)
			.then((response) => response.json())
			.then((data) => setEntryData(data));
	}, []);
	return (
		<section id="employeeEntryAdminData" className={displayNone}>
			<h1 className="text-xl">{t("employeeFormButton")}</h1>
			<table className="table-auto border-separate border-spacing-4 mt-5 bg-darkgray rounded-xl">
				<thead>
					<tr>
						<th className="border rounded-lg p-1">Documento</th>
						<th className="border rounded-lg p-1">Nombre</th>
						<th className="border rounded-lg p-1">Fecha de ingreso</th>
					</tr>
				</thead>
				<tbody className="">
					{entryData.map((employee, index) => (
						<tr key={employee.id}>
							<td className="border rounded-lg p-1">{employee.documento}</td>
							<td className="border rounded-lg p-1">{employee.nombre}</td>
							<td className="border rounded-lg p-1">
								{employee.fecha_ingreso}
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
