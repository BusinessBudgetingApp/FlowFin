"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import aiPen from "../../../public/ai-pen.png";
import { getAiRecommendation } from "@/hooks/useAi";
interface AIInsightProps {
  show: boolean;
  onClose: () => void;
}
interface AIInsightProps {
  show: boolean;
  onClose: () => void;
}
export default function AiModal({ show, onClose }: AIInsightProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAiRecommendation();
        setResponse(result);
      } catch (error) {
        console.error("Error fetching AI recommendation:", error);
        setResponse("Gagal mendapatkan rekomendasi.");
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show]);

  return (
    <section
      className={`w-[400px] absolute top-0 right-0 h-screen bg-white shadow-lg border transition-transform duration-300 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="flex justify-between items-center bg-[#F2F2F2] border-b-2 p-4">
        <div className="flex gap-2 justify-center items-center">
          <Image src={aiPen} width={15} height={5} alt="icon ai" />
          <p className="text-[#00859B] text-md font-sans">Insight dari AI</p>
        </div>
        <div className="flex cursor-pointer" onClick={onClose}>
          <X />
          <p>Tutup</p>
        </div>
      </header>

      <div className="text-sm whitespace-pre-line break-words text-gray-800 leading-relaxed px-2 bg-[#FFFFFF] max-h-[80vh] overflow-y-auto">
        {loading ? <p>Loading...</p> : <p>{response}</p>}
      </div>
    </section>
  );
}
