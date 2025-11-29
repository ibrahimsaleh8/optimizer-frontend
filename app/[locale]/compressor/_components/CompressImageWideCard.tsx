/* eslint-disable @next/next/no-img-element */
type Props = {
  imageData: CompressingUploadedImagesDataType;
  DeleteImage: (imageName: string) => void;
  changeQuality: (imageName: string, quality: number) => void;
  locale: string;
  index: number;
  t: ReturnType<typeof useTranslations>;
};
import { HardDriveDownload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";
import { CompressingUploadedImagesDataType } from "../page";
import { memo } from "react";
import { Input } from "@/components/ui/input";

function CompressImageWideCard({
  imageData,
  DeleteImage,
  changeQuality,
  locale,
  t,
  index,
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

      {/* Qualiy */}
      <div className="w-48 flex flex-col gap-3">
        <div className="flex flex-col items-start gap-2">
          <label
            className="text-sm font-medium"
            htmlFor={`compress-rate-${index}`}>
            Compress Rate:
          </label>
          <Input
            id={`compress-rate-${index}`}
            type="number"
            placeholder="Compress Rate"
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

      {/* Download Link */}
      <div className="min-w-32 min-h-14">
        {imageData.loading ? (
          <div className="flex items-center justify-center min-w-32 min-h-14 ">
            <Spinner className="w-5 h-5 text-black mt-5" />
          </div>
        ) : (
          imageData.isCompressed &&
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
                {t("download")} <HardDriveDownload />
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default memo(CompressImageWideCard);
