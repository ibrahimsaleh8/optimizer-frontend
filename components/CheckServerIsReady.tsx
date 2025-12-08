"use client";

import { BackendApiLink } from "@/lib/variabels";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "./ui/spinner";
import { useTranslations } from "next-intl";

async function getRequestFromServer(): Promise<{ message: string }> {
  const res = await axios.get(`${BackendApiLink}`);
  return res.data;
}
export default function CheckServerIsReady() {
  const t = useTranslations("RefreshTheServer");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["check_server"],
    queryFn: getRequestFromServer,
  });

  if (error && isError) throw new Error(error.message);

  return (
    !data &&
    isLoading && (
      <div className="flex flex-col items-center justify-center p-4 text-lg font-bold gap-3 bg-[#e7e7e7]">
        <p>⏳ {t("wakeingUpServer")}</p>
        <p>{t("takeTime")}</p>
        <p>{t("messageDisapper")}</p>
        <Spinner />
      </div>
    )
  );
}
