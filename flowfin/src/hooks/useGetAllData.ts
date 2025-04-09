"use client";
import { getData } from "@/lib/firestore";
import { IncomeTransaction } from "@/types/transaction";
import { useEffect, useState } from "react";

export const useGetAllData = () => {
  const [dashboardData, setDashboardData] = useState<IncomeTransaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return dashboardData;
};
