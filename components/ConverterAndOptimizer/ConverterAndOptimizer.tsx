"use client";
import { FolderUp, ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useConverterAndOptimizer } from "./useConverterAndOptimizer";
import ImageWideCard from "./ImageWideCard";

export default function ConverterAndOptimizer({
  type,
}: {
  type: "converter" | "compressor";
}) {
  const {
    changeQuality,
    ChangeConvertTo,
    DeleteImage,
    loading,
    t,
    uploadedImagesUrl,
    uploadRef,
    setUploadedImages,
    locale,
    HandelConvert,
  } = useConverterAndOptimizer({ type });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="w-full h-8 bg-black border-2 border-black flex items-center gap-4 p-4">
          <div className="w-4 h-4 bg-[#E8E557]"></div>
          <div className="w-4 h-4 bg-[#88E28C]"></div>
          <div className="w-4 h-4 bg-[#F96BC9]"></div>
        </div>

        <div className="bg-white relative p-4 border-t-0 text-black w-full h-64 border-2 border-dashed border-soft-border flex flex-col gap-3 items-center justify-center">
          <FolderUp className="w-24 h-24 text-second-black" />
          <label
            htmlFor="upload-image"
            className="px-6 py-2 bg-main-text text-black black-shadow border-2 border-black font-bold flex items-center gap-1 hover:bg-transparent hover:text-black hover:border-black cursor-pointer duration-300">
            <ImageUp className="w-5 h-5" /> {t("Converter.uploadImages")}
          </label>
          <input
            ref={uploadRef}
            multiple={true}
            onChange={(e) => {
              if (e.target.files) {
                setUploadedImages(e.target.files);
              }
            }}
            type="file"
            accept=".png, .jpg, .jpeg, .webp, .gif"
            className="hidden"
            id="upload-image"
          />
          <p> {t("Converter.maxFileSize")}</p>
        </div>
      </div>

      <div>
        {uploadedImagesUrl.length > 0 && (
          <div className="flex flex-col gap-5">
            {uploadedImagesUrl.map((image, i) => (
              <ImageWideCard
                ChangeConvertTo={ChangeConvertTo}
                DeleteImage={DeleteImage}
                index={i}
                key={image.name}
                imageData={image}
                changeQuality={changeQuality}
                locale={locale}
                t={t}
                type={type}
              />
            ))}

            <div className="flex justify-end">
              <Button
                disabled={
                  (type == "converter" &&
                    uploadedImagesUrl.some((im) => im.convertTo == null)) ||
                  uploadedImagesUrl.every((im) => im.isFinished) ||
                  loading
                }
                onClick={HandelConvert}
                className="w-48 h-10 cursor-pointer border-2 border-black rounded-none">
                {loading ? (
                  <Spinner className="text-white w-5 h-5" />
                ) : type == "converter" ? (
                  t("Converter.convert")
                ) : (
                  t("Compressor.compress")
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
