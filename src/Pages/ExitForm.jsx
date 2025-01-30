import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { LabelInput } from '../components/LabelInput'; 
import { DateInput } from '../components/DateInput'; 

export function ExitForm() {
  const { t } = useTranslation();
  const tipoPermiso = ['Salida Temporal', 'Fin de labores', 'Otro'];
  const [selectedPermiso, setSelectedPermiso] = useState(tipoPermiso[0]);

  const fields = [
    { name: 'exitDatePlaceHolder', component: DateInput },
    { name: 'entryDatePlaceHolder', component: DateInput },
    { name: 'Lugar', component: LabelInput },
    { name: 'Nombre', component: LabelInput },
    { name: 'Cargo', component: LabelInput },
    { name: 'Cedula', component: LabelInput },
    { name: 'Motivo', component: LabelInput },
    { name: 'Observaciones', component: LabelInput }
  ];

  const handlePermisoChange = (e) => {
    setSelectedPermiso(e.target.value);
  };

  return (
    <div className="bg-beige min-h-full p-5">
      <div className="exit-form__container">
        <h1 className="text-beigeTextText text-center text-4xl font-bold p-10 text-brown">
          {t('exitFormat')}
        </h1>
        <form onSubmit={(e) => sendForm(e)}>
          <section className="caravela-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto">
            {fields.map((field) => {
              const InputComponent = field.component;
              return (
                <div key={field.name} className="mb-4 w-full">
                  <label htmlFor={field.name} className="block text-brown font-bold mb-2">
                    {t(field.name)}
                  </label>
                  <InputComponent name={field.name} id={field.name} />
                </div>
              );
            })}

            <div className="mb-4 w-full">
              <label htmlFor="tipoPermiso" className="block text-brown font-bold mb-2">
                {t('tipoPermiso')}
              </label>
              <select 
                id="tipoPermiso" 
                name="tipoPermiso" 
                className="p-2 border-2 border-brown  w-full focus:outline-none focus:border-orange  text-brown" 
                value={selectedPermiso} 
                onChange={handlePermisoChange}
              >
                {tipoPermiso.map((option) => (
                  <option key={option} value={option}>
                    {t(option)}
                  </option>
                ))}
              </select>
              {selectedPermiso === 'Otro' && (
                <div className="mt-4">
                  <label htmlFor="otroPermiso" className="block text-brown font-bold mb-2">
                    {t('Especifique el tipo de permiso')}
                  </label>
                  <LabelInput name="otroPermiso" id="otroPermiso" />
                </div>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
