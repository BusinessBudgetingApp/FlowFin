import { getDataByMonth } from "@/lib/getDataByMonth";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

export async function getAiRecommendation(userId?: string) {
  const now = new Date();
  const selectedMonth = now.getMonth() + 1; // Bulan saat ini
  const selectedYear = now.getFullYear(); // Tahun saat ini
  const { pemasukan, pengeluaran } = await getDataByMonth(
    userId,
    selectedMonth,
    selectedYear
  );
  const prompt = `
    Saya memiliki usaha  dan berikut adalah data finansial saya untuk bulan ${selectedMonth}-${selectedYear}:

    **Pemasukan:**
    ${pemasukan.length > 0 ? pemasukan.join("\n") : "Tidak ada pemasukan"}

    **Pengeluaran:**
    ${pengeluaran.length > 0 ? pengeluaran.join("\n") : "Tidak ada pengeluaran"}

    Berdasarkan data di atas, berikan saya saran finansial yang spesifik untuk meningkatkan profit di bulan berikutnya. Dan juga berikan saya saran untuk mengurangi pengeluaran yang tidak perlu. Saya ingin tahu langkah-langkah konkret yang bisa saya ambil untuk mencapai tujuan ini.
    Pastikan saran yang diberikan relevan dengan data yang saya berikan dan mudah dipahami. Saya ingin saran yang praktis dan dapat langsung diterapkan.
    Saya juga ingin tahu tentang potensi risiko yang mungkin saya hadapi dan bagaimana cara mengatasinya. Berikan saya panduan langkah demi langkah untuk mencapai tujuan finansial saya.
    Saya ingin saran yang dapat membantu saya mengelola keuangan dengan lebih baik dan mencapai tujuan finansial saya.
    pastikan ini tidak hanya sekedar saran, tetapi juga contoh langkah yang harus saya ambil misal "kurangi pengeluaran untuk iklan sebesar 20% dan alokasikan ke pemasaran digital" dan lain-lain. saya ingin kamu lebih berfokus kepada saran yang lebih konkret dan spesifik, bukan hanya saran umum.
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
