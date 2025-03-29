import { getDataByMonth } from "@/lib/getDataByMonth";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

export async function getAiRecommendation(month?: number, year?: number) {
  const now = new Date();
  const selectedMonth = month || now.getMonth() + 1;
  const selectedYear = year || now.getFullYear();
  const { pemasukan, pengeluaran } = await getDataByMonth(
    selectedMonth,
    selectedYear
  );
  const prompt = `
    Saya memiliki usaha UMKM dan berikut adalah data finansial saya untuk bulan ${selectedMonth}-${selectedYear}:

    **Pemasukan:**
    ${pemasukan.length > 0 ? pemasukan.join("\n") : "Tidak ada pemasukan"}

    **Pengeluaran:**
    ${pengeluaran.length > 0 ? pengeluaran.join("\n") : "Tidak ada pengeluaran"}

    Berdasarkan data di atas, berikan saya saran finansial yang spesifik untuk meningkatkan profit di bulan berikutnya.
  `;
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", // Model Groq yang cepat dan gratis
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI:", error);
    return "Maaf, terjadi kesalahan.";
  }
}
