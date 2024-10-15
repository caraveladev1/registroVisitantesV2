import { formatISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DataTreatmentInput } from "../components/DataTreatmentInput";
import { DateInput } from "../components/DateInput";
import { LabelInput } from "../components/LabelInput";
import { SelectInput } from "../components/SelectInput";
import { SubmitButton } from "../components/submitButton";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export function EmployeeForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [documentNumber, setDocumentNumber] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [employeeData, setEmployeeData] = useState({
		name: "",
		eContact: "",
		eps: "",
		arl: "",
		rh: "",
		entryDate: "",
		exitDate: "",
		office: "",
		vName: "",
	});

	useEffect(() => {
		async function getEmployeeData() {
			const employeeApi = "https://dsbckvisitantes2024.azurewebsites.net/api/employee/data";
			try {
				const response = await fetch(employeeApi);
				const data = await response.json();
				const employee = data.find((item) => item.documento === documentNumber);
				if (employee) {
					setEmployeeData({
						...employeeData,
						name: employee.nombres,
						eContact: employee.num_emergencia,
						eps: employee.prov_salud,
						arl: employee.prov_salud_trabj,
						rh: employee.rh,
					});
				}
			} catch (error) {
				console.log(error);
			}
		}

		if (documentNumber) {
			getEmployeeData();
		}
	}, [documentNumber]);

	async function postEmployeeData(e) {
    e.preventDefault();
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    const postEmployeeApi = "https://dsbckvisitantes2024.azurewebsites.net/api/employee/post/data";
    const currentDate = new Date().toISOString();

    const entryDate = document.getElementById("entryDateId").value;
    const exitDate = document.getElementById("exitDateId").value;

    let formattedEntryDate = null;
    if (entryDate) {
        try {
            formattedEntryDate = formatISO(new Date(entryDate));
        } catch (error) {
            console.log("Invalid entry date:", entryDate);
            loader.style.display = "none";
            alert("Fecha de ingreso inválida. Por favor, verifique y vuelva a intentar.");
            return;
        }
    }

    const employeeData = {
        oficina_pro: document.getElementById("country").value,
        documento: document.getElementById("documentId").value,
        nombre: document.getElementById("nameId").value,
        num_emergencia: document.getElementById("eContactId").value,
        prov_salud: document.getElementById("epsId").value,
        prov_salud_trabj: document.getElementById("arlId").value,
        rh: document.getElementById("rhId").value,
        funcionario_a_visitar: document.getElementById("vNameId").value,
        fecha_transfer: currentDate,
        created_at: currentDate,
        updated_at: currentDate,
    };

    if (formattedEntryDate) {
        employeeData.fecha_ingreso = formattedEntryDate;
        employeeData.confirmar_entrada = 1;
    }
    
    if (exitDate) {
        employeeData.fecha_salida = exitDate;
        employeeData.confirmar_salida = 0;
    }

    try {
        const response = await fetch(postEmployeeApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        });
        if (response.status === 200) {
            setShowAlert(true);
            alert("Registro guardado exitosamente");
            reloadPage();
        } else {
            setShowAlert(false);
            alert("Error al guardar el registro. Por favor, intente nuevamente.");
        }
    } catch (error) {
        console.log(error);
        alert("Ocurrió un error al guardar el registro. Por favor, intente nuevamente.");
    } finally {
        loader.style.display = "none";
    }
}

	function reloadPage() {
		navigate("/");
	}

	return (
		<div className="bg-beige p-5 ">
			<h1 className="text-beigeTextText text-center text-4xl font-bold p-10  text-brown">
				{t("employeeFormTitle")}
			</h1>
			<form action="submit" onSubmit={postEmployeeData}>
				<section className="caravela-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
					<span className="w-full">
						<h3 className="text-beigeTextText">{t("officePlaceHolder")}</h3>
						<SelectInput
							idSelect="country"
							value={employeeData.office}
							onChange={(e) => setEmployeeData({ ...employeeData, office: e.target.value })}
						/>
					</span>
					<LabelInput
						idLabel="documentId"
						placeholder={t("documentPlaceHolder")}
						required
						onChange={(e) => setDocumentNumber(e.target.value)}
						value={documentNumber}
					/>
					<LabelInput
						idLabel="nameId"
						placeholder={t("namePlaceHolder")}
						required
						value={employeeData.name}
						onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
					/>
					<LabelInput
						idLabel="eContactId"
						placeholder={t("emergencyContactPlaceHolder")}
						required
						value={employeeData.eContact}
						onChange={(e) => setEmployeeData({ ...employeeData, eContact: e.target.value })}
					/>
					<LabelInput
						idLabel="epsId"
						placeholder={t("epsPlaceHolder")}
						required
						value={employeeData.eps}
						onChange={(e) => setEmployeeData({ ...employeeData, eps: e.target.value })}
					/>
					<LabelInput
						idLabel="arlId"
						placeholder={t("arlPlaceHolder")}
						required
						value={employeeData.arl}
						onChange={(e) => setEmployeeData({ ...employeeData, arl: e.target.value })}
					/>
					<LabelInput
						idLabel="rhId"
						placeholder={t("rhPlaceHolder")}
						required
						value={employeeData.rh}
						onChange={(e) => setEmployeeData({ ...employeeData, rh: e.target.value })}
					/>
					<LabelInput
						idLabel="vNameId"
						placeholder={t("visitingNamePlaceHolder")}
						required
						value={employeeData.vName}
						onChange={(e) => setEmployeeData({ ...employeeData, vName: e.target.value })}
					/>
					<span className="w-full">
						<h3 className="text-brown">{t("entryDatePlaceHolder")}</h3>
						<DateInput
							dateId="entryDateId"
							value={employeeData.entryDate}
							onChange={(e) => setEmployeeData({ ...employeeData, entryDate: e.target.value })}
						/>
					</span>
					<span className="w-full">
						<h3 className="text-brown">{t("exitDatePlaceHolder")}</h3>
						<DateInput
							dateId="exitDateId"
							value={employeeData.exitDate}
							onChange={(e) => setEmployeeData({ ...employeeData, exitDate: e.target.value })}
						/>
					</span>
					<DataTreatmentInput required />
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
							<p className="text-brown text-center ml-2">Cargando...</p>
						</div>
					</div>
				</section>
			</form>
		</div>
	);
}
