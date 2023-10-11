import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export function AdminEditEmployee() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [entryData, setEntryData] = useState([]);
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const apiEmployee = "http://localhost:1234/api/employee/dataEntry";
		fetch(apiEmployee)
			.then((response) => response.json())
			.then((data) => {
				setEntryData(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	const handleEditClick = (employee) => {
		setSelectedEntry(employee);
		navigate(`/edit/employee/${employee.id}`);
	};

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
	if (!entryData) {
		return (
			<div className="bg-blue bg-contain min-h-screen flex justify-center items-center">
				<p>No se encontraron datos.</p>
			</div>
		);
	}

	return (
		<section id="employeeEntryAdminData">
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
								<button
									type="button"
									className="text-gray"
									onClick={() => handleEditClick(employee)}
								>
									Ver
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
