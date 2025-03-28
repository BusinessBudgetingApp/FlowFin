import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

export async function getAiRecommendation(financeData: {
  pendapatan: number;
  pengeluaran: number;
}) {
  const prompt = `Saya memiliki usaha UMKM dengan pendapatan Rp${financeData.pendapatan} dan pengeluaran Rp${financeData.pengeluaran}. Berikan saya saran finansial yang spesifik untuk meningkatkan profit.`;

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
