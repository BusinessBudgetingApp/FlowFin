"use client";

import MainContentHome from "@/components/home/MainContentHome";
import { withAuth } from "@/lib/withAuth";

function Home() {
  return (
    <>
      <MainContentHome />
    </>
  );
}

export default withAuth(Home);
