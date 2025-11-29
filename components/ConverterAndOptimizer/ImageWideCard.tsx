/* eslint-disable @next/next/no-img-element */
type Props = {
  imageData: UploadedImagesDataType;
  index: number;
  DeleteImage: (imageName: string) => void;
  ChangeConvertTo: (imageName: string, convertTo: string) => void;
  changeQuality: (imageName: string, quality: number) => void;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  type: "converter" | "compressor";
};
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { imageFormats } from "@/lib/variabels";
import { HardDriveDownload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";
import { UploadedImagesDataType } from "@/components/ConverterAndOptimizer/useConverterAndOptimizer";
import { Input } from "@/components/ui/input";

export default function ImageWideCard({
  imageData,
  index,
  DeleteImage,
  ChangeConvertTo,
  changeQuality,
  locale,
  t,
  type,
}: Props) {
  return (
    <div className="relative flex md:flex-row flex-col items-center gap-4 flex-wrap justify-between p-4 bg-white text-black">
      <button
        onClick={() => DeleteImage(imageData.name)}
        className={`w-4 h-4 flex items-center justify-center bg-red-500 text-white hover:opacity-80  shadow cursor-pointer  absolute ${
          locale == "ar" ? "right-[-5px]" : "left-[-5px]"
        } top-[-5px]`}>
        <X className="w-3 h-3" />
      </button>

      <div className="flex md:flex-row flex-col items-center text-center md:text-left gap-3">
        <img
          src={imageData.url}
          className="w-28"
          alt={imageData.name}
          title={imageData.name}
        />
        <div
          className={`flex flex-col gap-1 ${
            locale == "ar" ? "text-right" : "text-left"
          }`}>
          <p title={imageData.name} className="md:w-72 w-full line-clamp-1">
            {imageData.name}
          </p>
          <p className="font-medium">{imageData.name.split(".")[1]}</p>
          <p>{(imageData.size / 1024).toFixed(1)} KB</p>
        </div>
      </div>

      {type == "converter" ? (
        <>
          {/* Convert to */}
          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium"
              htmlFor={`convert-to-${index}`}>
              {t("Converter.convertTo")}:
            </label>
            <Select
              onValueChange={(e) => {
                ChangeConvertTo(imageData.name, e);
              }}>
              <SelectTrigger
                id={`convert-to-${index}`}
                className="sm:w-[180px] w-full">
                <SelectValue placeholder={t("Converter.convertTo")} />
              </SelectTrigger>
              <SelectContent>
                {imageFormats
                  .filter((f) => f != imageData.name.split(".")[1])
                  .map((format, i) => (
                    <SelectItem key={i} value={format}>
                      {format}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quality */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor={`quailty-${index}`}>
              {t("Converter.quality")}:
            </label>
            <Select
              defaultValue="100"
              onValueChange={(e) => {
                changeQuality(imageData.name, +e);
              }}>
              <SelectTrigger
                id={`quailty-${index}`}
                className="sm:w-[180px] w-full">
                <SelectValue placeholder="Convert To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"100"}>
                  {t("Converter.sameQuality")}
                </SelectItem>
                <SelectItem value={"70"}>
                  {t("Converter.mediumOptimization")}
                </SelectItem>
                <SelectItem value={"50"}>
                  {t("Converter.maxOptimization")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <div className="w-48 flex flex-col gap-3">
          <div className="flex flex-col items-start gap-2">
            <label
              className="text-sm font-medium"
              htmlFor={`compress-rate-${index}`}>
              {t("Compressor.compressRate")}:
            </label>
            <Input
              id={`compress-rate-${index}`}
              type="number"
              placeholder={t("Compressor.compressRate")}
              min={1}
              defaultValue={70}
              max={100}
              maxLength={3}
              onChange={(e) => {
                if (+e.target.value > 100) e.target.value = "100";
                changeQuality(imageData.name, +e.target.value);
              }}
            />
          </div>
        </div>
      )}

      {/* Download Link */}
      <div className="min-w-32 min-h-14">
        {imageData.loading ? (
          <div className="flex items-center justify-center min-w-32 min-h-14 ">
            <Spinner className="w-5 h-5 text-black mt-5" />
          </div>
        ) : (
          imageData.isFinished &&
          imageData.downloadLink && (
            <div>
              <Button
                onClick={() => {
                  saveAs(
                    imageData.downloadLink as string,
                    imageData.name.split(".")[0]
                  );
                }}
                className="bg-main-text text-black cursor-pointer mt-5 min-w-32 flex items-center rounded-none border-2 border-black gap-3 hover:bg-transparent duration-300 ">
                {t("Converter.download")} <HardDriveDownload />
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
