"use client";
import { FolderUp, ImageUp, Minimize2 } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import CompressImageWideCard from "./_components/CompressImageWideCard";
import { Button } from "@/components/ui/button";
export type CompressingUploadedImagesDataType = {
  name: string;
  url: string;
  size: number;
  image: File;
  quality: number;
  isCompressed: boolean;
  downloadLink: string | null;
  loading: boolean;
};
export default function CompressorPage() {
  const t = useTranslations();
  const locale = useLocale();

  const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<
    CompressingUploadedImagesDataType[]
  >([]);
  const uploadRef = useRef<HTMLInputElement>(null);
  const resetUploadedImages = useEffectEvent(() => {
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  });

  const setImagesUrl = useEffectEvent(
    (images: CompressingUploadedImagesDataType[]) => {
      if (uploadedImagesUrl.length > 0) {
        setUploadedImagesUrl([...uploadedImagesUrl, ...images]);
      } else {
        setUploadedImagesUrl(images);
      }
      setUploadedImages(null);
    }
  );

  const DeleteImage = (imageName: string) => {
    setUploadedImagesUrl((prev) => {
      const imageToDelete = prev.find((im) => im.name === imageName);
      if (imageToDelete) URL.revokeObjectURL(imageToDelete.url);
      return prev.filter((im) => im.name !== imageName);
    });
  };
  const changeQuality = (imageName: string, quality: number) => {
    setUploadedImagesUrl((prev) =>
      prev.map((p) => (p.name === imageName ? { ...p, quality } : p))
    );
  };

  const HandelCompression = () => {
    console.log(uploadedImagesUrl);
  };

  useEffect(() => {
    if (!uploadedImages) return;

    const imgs = Array.from(uploadedImages);

    resetUploadedImages();

    const urls = imgs
      .filter(
        (im) =>
          im.size <= 10 * 1024 * 1024 &&
          !uploadedImagesUrl.some((img) => img.name === im.name)
      )
      .map((e) => ({
        url: URL.createObjectURL(e),
        name: e.name,
        size: e.size,
        image: e,
        quality: 50,
        isCompressed: false,
        downloadLink: null,
        loading: false,
      }));
    setImagesUrl(urls);
  }, [uploadedImages, uploadedImagesUrl]);

  return (
    <div className="container mx-auto py-10 px-3 sm:px-1 flex flex-col gap-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Minimize2 />
        {t("Compressor.imageCompressor")}
      </h1>

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

      {uploadedImagesUrl.length > 0 &&
        uploadedImagesUrl.map((image, i) => (
          <CompressImageWideCard
            changeQuality={changeQuality}
            DeleteImage={DeleteImage}
            index={i}
            key={image.name}
            imageData={image}
            locale={locale}
            t={t}
          />
        ))}

      <Button onClick={HandelCompression}>Compress</Button>
    </div>
  );
}
