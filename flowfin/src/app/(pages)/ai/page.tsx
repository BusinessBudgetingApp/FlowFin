import { getAiRecommendation } from "@/hooks/useAi";
import { getDataByMonth } from "@/lib/getDataByMonth";
import { X } from "lucide-react";

export default async function AIInsight() {
  const response = await getAiRecommendation();
  console.log(response);

  return (
    <>
      <section className="w-[700px] absolute border right-0">
        <header className="flex justify-between items-center bg-white border-b-2 p-4">
          <p>AI insight</p>
          <div className="flex">
            <X />
            <p>Tutup</p>
          </div>
        </header>
        <div></div>
      </section>
    </>
  );
}
