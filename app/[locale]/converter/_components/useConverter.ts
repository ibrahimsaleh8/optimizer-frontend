import { ShowToast } from "@/components/Toast";
import axios from "axios";
import { BackendApiLink } from "@/lib/variabels";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { UploadedImagesDataType } from "../page";

async function convertImagesApi(data: FormData): Promise<{
  images: {
    name: string;
    downloadLink: string;
  }[];
}> {
  const res = await axios.post(`${BackendApiLink}/api/images/convert`, data);
  return res.data;
}
export const useConverter = () => {
  const t = useTranslations("Converter");
  const locale = useLocale();
  const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<
    UploadedImagesDataType[]
  >([]);

  const [loading, setLoading] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);

  const setImagesUrl = useEffectEvent((images: UploadedImagesDataType[]) => {
    if (uploadedImagesUrl.length > 0) {
      setUploadedImagesUrl([...uploadedImagesUrl, ...images]);
    } else {
      setUploadedImagesUrl(images);
    }
    setUploadedImages(null);
  });

  const resetUploadedImages = useEffectEvent(() => {
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  });

  const DeleteImage = (imageName: string) => {
    setUploadedImagesUrl((prev) => {
      const imageToDelete = prev.find((im) => im.name === imageName);
      if (imageToDelete) URL.revokeObjectURL(imageToDelete.url);
      return prev.filter((im) => im.name !== imageName);
    });
  };

  const ChangeConvertTo = (imageName: string, convertTo: string) => {
    setUploadedImagesUrl((prev) =>
      prev.map((p) => (p.name === imageName ? { ...p, convertTo } : p))
    );
  };

  const changeQuality = (imageName: string, quality: number) => {
    setUploadedImagesUrl((prev) =>
      prev.map((p) => (p.name === imageName ? { ...p, quality } : p))
    );
  };

  const HandleImagesAfterConvert = (
    imageName: string,
    downloadLink: string
  ) => {
    setUploadedImagesUrl((prev) =>
      prev.map((p) =>
        p.name === imageName
          ? { ...p, downloadLink, isConverted: true, loading: false }
          : p
      )
    );
  };

  const HandelConvert = async () => {
    if (uploadedImagesUrl.some((im) => !im.convertTo)) {
      ShowToast("Please choose a format to convert", "error");
      return;
    }

    const willConvert = uploadedImagesUrl.filter((img) => !img.isConverted);

    if (willConvert.length === 0) return;

    setLoading(true);

    try {
      const chunks: UploadedImagesDataType[][] = [];
      for (let i = 0; i < willConvert.length; i += 2) {
        chunks.push(willConvert.slice(i, i + 2));
      }

      for (const chunk of chunks) {
        setUploadedImagesUrl((prev) =>
          prev.map((p) =>
            chunk.some((c) => c.name === p.name) ? { ...p, loading: true } : p
          )
        );

        const formData = new FormData();

        chunk.forEach((img) => {
          formData.append("images", img.image);
        });

        formData.append(
          "data",
          JSON.stringify(
            chunk.map((img) => ({
              name: img.name,
              convertTo: img.convertTo,
              quality: img.quality,
            }))
          )
        );

        const res = await convertImagesApi(formData);

        res.images.forEach((converted) => {
          HandleImagesAfterConvert(converted.name, converted.downloadLink);
        });
      }

      ShowToast(t("convertingWasSuccess"), "success");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        ShowToast(error.response?.data.message ?? "Error", "error");
      }
    } finally {
      setLoading(false);
    }
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
        convertTo: null,
        size: e.size,
        image: e,
        quality: 100,
        isConverted: false,
        downloadLink: null,
        loading: false,
      }));
    setImagesUrl(urls);
  }, [uploadedImages, uploadedImagesUrl]);

  return {
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
  };
};
