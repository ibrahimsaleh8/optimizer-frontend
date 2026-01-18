import { ShowToast } from "@/components/Toast";
import axios from "axios";
import { BackendApiLink } from "@/lib/variabels";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useEffectEvent, useRef, useState } from "react";
export type UploadedImagesDataType = {
  name: string;
  url: string;
  size: number;
  convertTo: string | null;
  image: File;
  quality: number;
  isFinished: boolean;
  downloadLink: string | null;
  loading: boolean;
  sizeForDownload: number;
};

type ImagesServerResponse = {
  name: string;
  downloadLink: string;
  size: number;
};

async function convertImagesApi(data: FormData): Promise<ImagesServerResponse> {
  const res = await axios.post(`${BackendApiLink}/api/images/convert`, data);
  return res.data;
}

async function compressImagesApi(
  data: FormData,
): Promise<ImagesServerResponse> {
  const res = await axios.post(`${BackendApiLink}/api/images/compress`, data);
  return res.data;
}

export const useConverterAndOptimizer = ({
  type,
}: {
  type: "converter" | "compressor";
}) => {
  const t = useTranslations();
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
      prev.map((p) => (p.name === imageName ? { ...p, convertTo } : p)),
    );
  };

  const changeQuality = (imageName: string, quality: number) => {
    setUploadedImagesUrl((prev) =>
      prev.map((p) => (p.name === imageName ? { ...p, quality } : p)),
    );
  };

  const HandleImagesAfterConvert = (
    imageName: string,
    downloadLink: string,
    sizeForDownload: number,
  ) => {
    setUploadedImagesUrl((prev) =>
      prev.map((p) =>
        p.name === imageName
          ? {
              ...p,
              downloadLink,
              isFinished: true,
              loading: false,
              sizeForDownload,
            }
          : p,
      ),
    );
  };

  const HandelConvert = async () => {
    if (type == "converter" && uploadedImagesUrl.some((im) => !im.convertTo)) {
      ShowToast("Please choose a format to convert", "error");
      return;
    }

    const willConvert = uploadedImagesUrl.filter((img) => !img.isFinished);

    if (willConvert.length === 0) return;

    setLoading(true);

    try {
      const chunks: UploadedImagesDataType[][] = [];
      for (let i = 0; i < willConvert.length; i += 1) {
        chunks.push(willConvert.slice(i, i + 1));
      }

      for (const chunk of chunks) {
        setUploadedImagesUrl((prev) =>
          prev.map((p) =>
            chunk.some((c) => c.name === p.name) ? { ...p, loading: true } : p,
          ),
        );

        const formData = new FormData();

        chunk.forEach((img) => {
          formData.append("image", img.image);
        });

        if (type == "converter") {
          formData.append(
            "data",
            JSON.stringify({
              name: chunk[0].name,
              convertTo: chunk[0].convertTo,
              quality: chunk[0].quality,
            }),
          );
        } else {
          formData.append(
            "data",
            JSON.stringify({
              name: chunk[0].name,
              quality: chunk[0].quality,
            }),
          );
        }

        const res =
          type == "converter"
            ? await convertImagesApi(formData)
            : await compressImagesApi(formData);

        HandleImagesAfterConvert(res.name, res.downloadLink, res.size);
      }

      ShowToast(
        type == "converter"
          ? t("Converter.convertingWasSuccess")
          : t("Compressor.compressingWasSuccess"),
        "success",
      );
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
          !uploadedImagesUrl.some((img) => img.name === im.name),
      )
      .map((e) => ({
        url: URL.createObjectURL(e),
        name: e.name,
        convertTo: null,
        size: e.size,
        image: e,
        quality: 100,
        isFinished: false,
        downloadLink: null,
        loading: false,
        sizeForDownload: 0,
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
