import { IncomeTransaction } from "@/types/transaction";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (
  bodyData: IncomeTransaction[],
  transactionType: string
) => {
  const rows = bodyData.map((item, i) => [
    i + 1,
    item.timestamp.toDate().toLocaleDateString(),
    item.productName,
    item.category,
    `Rp${item.amount.toLocaleString("id-ID")}`,
    item.description,
  ]);

  const doc = new jsPDF({
    unit: "mm",
    format: "a4", // Lebih compact
  });

  doc.setFontSize(14);
  doc.text(`Laporan ${transactionType} Keuangan UMKM`, 14, 10);

  autoTable(doc, {
    head: [
      ["NO", "Tanggal", "Nama Produk", "Kategori", "Jumlah", "Keterangan"],
    ],
    body: rows,
    startY: 15,
    theme: "grid",
    headStyles: {
      fillColor: [0, 133, 155],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 10,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    styles: {
      cellPadding: 3,
      overflow: "linebreak",
      halign: "left",
    },
  });

  doc.save("laporan_Keuangan.pdf");
};
