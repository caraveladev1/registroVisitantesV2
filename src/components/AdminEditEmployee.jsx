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
		const apiEmployee = "https://bckappvisitantes.azurewebsites.net/api/employee/dataEntry";
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
	if (!entryData) {
		return (
			<div className=" bg-contain min-h-screen flex justify-center items-center">
				<p>No se encontraron datos.</p>
			</div>
		);
	}

	return (
		<section id="employeeEntryAdminData">
			<h1 className="text-xl text-center mt-5 md:text-start md:mt-0">
				{t("employeeFormButton")}
			</h1>
			<table className="table-auto border-separate border-spacing-4 m-auto mt-5  bg-gray border border-darkgray ">
				<thead>
					<tr>
						<th className="border border-brown text-brown p-1">Documento</th>
						<th className="border border-brown text-brown p-1">Nombre</th>
						<th className="hidden sm:block border border-brown text-brown p-1">
							Fecha de ingreso
						</th>
					</tr>
				</thead>
				<tbody className="">
					{entryData.map((employee, index) => (
						<tr key={employee.id}>
							<td className="border border-brown p-1">{employee.documento}</td>
							<td className="border border-brown p-1">{employee.nombre}</td>
							<td className="hidden sm:block border border-brown p-1">
								<p className="text-brown">
									{employee.fecha_ingreso}
								</p>
							</td>
							<td className="border  p-1 border-brown">
								<button
									type="button"
									className="text-brown"
									onClick={() => handleEditClick(employee)}
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
