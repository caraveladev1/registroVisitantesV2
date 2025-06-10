import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formatISO, addDays } from "date-fns";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import {API_BASE} from '../const/const.js'

export function VisitorForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { isClient: false, daysInOffice: 1 } });

  // Valores dependientes
  const entryDate = watch("entryDate");
  const daysInOffice = watch("daysInOffice");
  const isClient = watch("isClient");
  const country = watch("country");

  // Actualiza fecha de salida automáticamente solo si entryDate es válido
  useEffect(() => {
    if (entryDate && daysInOffice != null) {
      const parsedEntry = new Date(entryDate);
      if (!isNaN(parsedEntry)) {
        const exit = addDays(parsedEntry, Number(daysInOffice));
        setValue("exitDate", formatISO(exit, { representation: "date" }));
      }
    }
  }, [entryDate, daysInOffice, setValue]);

  // Configuración de campos
  const fields = [
    {
      name: "country",
      label: t("office"),
      type: "select",
      options: [
        "Colombia",
        "Mexico",
        "USA",
        "UK",
        "Australia",
        "Perú",
        "Ecuador",
        "Nicaragua",
        "El Salvador",
        "Guatemala",
      ],
      validation: { required: true },
    },
    {
      name: "isClient",
      label: t("areYouCaravelaClient"),
      type: "checkbox",
    },
    {
      name: "documentId",
      label: t("documentPlaceHolder"),
      type: "text",
      validation: { required: true },
    },
    {
      name: "name",
      label: t("namePlaceHolder"),
      type: "text",
      validation: { required: true },
    },
    {
      name: "eContact",
      label: t("emergencyContactPlaceHolder"),
      type: "text",
      validation: { required: true },
    },
    {
      name: "rh",
      label: t("rhPlaceHolder"),
      type: "text",
      validation: { required: true },
    },
    {
      name: "visitingName",
      label: t("visitingNamePlaceHolder"),
      type: "text",
      validation: { required: true },
    },
    {
      name: "entryDate",
      label: t("entryDatePlaceHolder"),
      type: "date",
      validation: { required: true },
    },
    {
      name: "daysInOffice",
      label: t("daysInOfficePlaceholder"),
      type: "number",
      validation: { required: true, min: 0 },
    },
    {
      name: "expeditionDate",
      label: t("expeditionDatePlaceholder"),
      type: "date",
      visible: ({ isClient }) => !isClient,
      validation: ({ isClient }) => (!isClient ? { required: true } : {}),
    },
    {
      name: "contractorName",
      label: t("contractorNamePlaceholder"),
      type: "text",
    },
    // Nuevo campo: ARL (solo Colombia)
    {
      name: "arl",
      label: t("arlPlaceHolder"),
      type: "select",
      options: [
        "SURA",
        "Positiva",
        "Colmena Seguros",
        "AXA Colpatria",
        "Liberty",
        "Bolívar",
      ],
      visible: ({ country }) => country === "Colombia",
      validation: { required: true },
    },
    // Nuevo campo: Motivo de la visita
    {
      name: "visitReason",
      label: t("visitReasonPlaceholder"),
      type: "textarea",
      validation: { required: true },
    },
    {
      name: "observations",
      label: t("observation"),
      type: "textarea",
    },
  ];

  function reloadPage() {
    navigate("/");
  }

  async function onSubmit(data) {
    document.getElementById("loader").style.display = "block";
    const now = new Date().toISOString();
    const payload = {
      oficina_pro: data.country,
      documento: data.documentId,
      nombre: data.name,
      num_emergencia: data.eContact,
      rh: data.rh,
      funcionario_a_visitar: data.visitingName,
      fecha_ingreso: formatISO(new Date(data.entryDate)),
      fecha_salida: data.exitDate,
      fecha_expedicion_documento: data.expeditionDate || null,
      nombre_contratista: data.contractorName || null,
      arl: data.arl || null,
      motivo_visita: data.visitReason,
      fecha_transfer: now,
      created_at: now,
      updated_at: now,
      confirmar_entrada: !!data.entryDate,
      confirmar_salida: !!data.exitDate,
      observations: data.observations || "",
      es_cliente: data.isClient,
    };

    try {
      const response = await fetch(
        `${API_BASE}/visitors/post/data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        alert(t("registrationSuccess"));
        reloadPage();
      } else {
        alert(t("registrationError"));
      }
    } catch (error) {
      console.error(error);
      alert(t("registrationError"));
    } finally {
      document.getElementById("loader").style.display = "none";
    }
  }

  return (
    <div className="containerVisitorForm p-5 bg-beige">
      <h1 className="text-brown text-center text-4xl font-bold p-10">
        {t("visitorFormTitle")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <section className="visitor-form flex flex-col items-center gap-5 max-w-[60%] m-auto">
          {/* Campo oculto para exitDate */}
          <input type="hidden" {...register("exitDate")} />

          {fields.map((field) => {
            const isVisible =
              field.visible === undefined ||
              field.visible({ isClient, country });
            if (!isVisible) return null;

            const validation =
              typeof field.validation === "function"
                ? field.validation({ isClient })
                : field.validation || {};

            return (
              <div key={field.name} className="w-full">
                {field.type !== "checkbox" && field.label && (
                  <label className="text-brown block mb-1" htmlFor={field.name}>
                    {field.label}
                  </label>
                )}
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    {...register(field.name, validation)}
                    className="w-full p-2 border "
                  >
                    <option value="">-- {field.label} --</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    {...register(field.name, validation)}
                    placeholder={field.label}
                    className="w-full p-2 border h-24"
                  />
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center gap-2">
                    <input
                      id={field.name}
                      type="checkbox"
                      {...register(field.name, validation)}
                    />
                    <label htmlFor={field.name}>{field.label}</label>
                  </div>
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    {...register(field.name, validation)}
                    placeholder={field.type !== "date" ? field.label : undefined}
                    className="w-full p-2 border "
                    min={field.min}
                  />
                )}
                {errors[field.name] && (
                  <span className="text-red-600">{t("fieldRequired")}</span>
                )}
              </div>
            );
          })}

          {/* Términos y Condiciones + Submit */}
          <div className="w-full flex justify-between items-center">
            <div>
              <input
                id="dataTreatment"
                type="checkbox"
                {...register("dataTreatment", { required: true })}
              />
              <label htmlFor="dataTreatment" className="ml-2">
                {t("dataTreatment")} &nbsp;
                <a href='../staticfiles/DataTreatment.pdf' target="_blank" className="underline">
                  {t("clickTermsConditions")}
                </a>
                <span> and </span>
                <a href='../staticfiles/NDA_visitors.pdf' target="_blank" className="underline">
                  {t("clickTermsConditions2")}
                </a>
              </label>
              {errors.dataTreatment && (
                <span className="text-red-600 block">
                  {t("fieldRequired")}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brown text-beigeText "
            >
              {t("submit")}
            </button>
          </div>

          {/* Loader */}
          <div
            id="loader"
            style={{ display: "none" }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/[.6] w-full h-full flex justify-center items-center z-50"
          >
            <div className="p-4 -lg flex items-center justify-center flex-col w-full h-full">
              <TailSpin height="50" width="50" color="#fff" ariaLabel="loading" />
              <p className="text-beigeText text-center ml-2">{t("loadingText")}</p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
