"use client";

import { X } from "lucide-react";
import Image from "next/image";

import aiPen from "../../../public/ai-pen.png";
import { getAiRecommendation } from "@/hooks/useAi";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface AIInsightProps {
  show: boolean;
  onClose: () => void;
}

export default function AiModal({ show, onClose }: AIInsightProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAiRecommendation(user?.uid);
        setResponse(result);
      } catch (error) {
        console.error("Error fetching AI recommendation:", error);
        setResponse(
          "Maaf, terjadi kesalahan saat memproses rekomendasi AI. Silakan coba lagi nanti."
        );
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchData();
    } else {
      setResponse(null);
      setLoading(true);
    }
  }, [show]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 z-40 bg-white/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleBackdropClick}
          />

          {/* MODAL */}
          <section className="fixed top-0 right-0 h-full max-w-3xl  bg-white shadow-xl transition-all duration-300 ease-in-out z-50 translate-x-0">
            {/* Header */}
            <header className="relative flex justify-center items-center bg-[#F2F2F2] border-b p-4 top-0 z-10">
              <div className="flex items-center space-x-2">
                <Image
                  src={aiPen}
                  width={20}
                  height={20}
                  alt="AI Icon"
                  className="w-5 h-5"
                />
                <h2 className="text-[#00859B] text-lg font-medium text-center">
                  Insight dari AI
                </h2>
              </div>
              {loading ? (
                ""
              ) : (
                <button
                  onClick={onClose}
                  className="absolute right-4 flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="Tutup modal"
                >
                  <X className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline">Tutup</span>
                </button>
              )}
            </header>

            {/* Konten */}
            <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              ) : (
                <div className="text-gray-700 ">
                  {response ? (
                    <div className="space-y-4 text-sm leading-relaxed">
                      {response
                        .split("\n")
                        .map((paragraph: string, index: number) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Tidak ada data yang tersedia</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
