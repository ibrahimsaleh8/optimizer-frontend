"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-10 ">
      <div className="flex gap-4 flex-col p-10 bg-red-500 text-white text-left">
        <h2 className="flex items-center gap-4 text-xl">
          Something went wrong!
        </h2>
        <p className="text-lg">{error.message}</p>
        <div className="flex items-center gap-4 mt-3">
          <button
            className="w-fit px-8 py-3 bg-white text-black font-bold cursor-pointer"
            onClick={() => reset()}>
            Try again
          </button>
          <Link
            className="w-fit px-8 py-3 bg-black text-white font-bold cursor-pointer"
            href={"/"}>
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
