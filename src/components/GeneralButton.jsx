import React from "react";
import { useTranslation } from "react-i18next";

export function GeneralButton({ textBtn, style }) {
  const { t } = useTranslation();
  return (
    <button
      className={` bg-beige hover:bg-orange text-brown  py-2  min-w-[80%] ${style}`}
      type="submit"
    >
      {t(`${textBtn}`)}
    </button>
  );
}
