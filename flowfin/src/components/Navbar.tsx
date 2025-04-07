"use client";

import avatar from "../../public/avatar.png";
import AI from "../../public/AI.png";

import { useEffect, useState } from "react";
import AiModal from "./AI/AiModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [showAI, setShowAI] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // mobile + tablet
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || "User");
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-10 main-container w-full h-fit bg-[#F6F6F6]">
        <div className="navbar-container flex justify-between pl-20 lg:pl-10 pr-4 py-4 bg-white items-center">
          <h1 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#212121]">
            Dashboard
          </h1>
          <div className="flex items-center gap-3 md:gap-5">
            <button
              className="flex bg-[#0C0011] px-3 md:px-5 py-2 gap-2 rounded-full items-center cursor-pointer"
              onClick={() => setShowAI(!showAI)}
            >
              <picture>
                <img
                  src={AI.src}
                  width={20}
                  height={20}
                  alt=""
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </picture>
              {!isSmallScreen && (
                <h1 className="font-semibold text-[14px] md:text-[16px] text-white">
                  AI Insight
                </h1>
              )}
            </button>
            <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-5 pr-1 md:pr-3 border-l border-[#B7BBC0]">
              <picture>
                <img
                  src={avatar.src}
                  width={28}
                  height={28}
                  alt=""
                  className="w-7 h-7 md:w-9 md:h-9"
                />
              </picture>
              {!isSmallScreen && (
                <h1 className="font-semibold text-[14px] md:text-[16px]">
                  Hi, {userName || "Loading..."}
                </h1>
              )}
            </div>
          </div>
        </div>
        <AiModal show={showAI} onClose={() => setShowAI(false)} />
      </nav>
    </>
  );
}
