"use client";
import React, { ReactNode, MouseEventHandler } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function AnimatedDropdown({
  label,
  children,
  selected,
  onSelect,
}: {
  label: number | string;
  children: ReactNode;
  selected?: number | string;
  className?: string;
  onSelect: (value: number | string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`relative inline-block`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selected || label}
        <ChevronDownIcon
          className={`ml-2 w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg"
          >
            <div className="py-1">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    // @ts-ignore
                    onSelect: (value: string) => {
                      onSelect(value);
                      setIsOpen(false);
                    },
                  });
                }
                return child;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({
  children,
  value,
  onSelect,
}: {
  children: ReactNode;
  value: number | string;
  onSelect: (value: number | string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(value)}
      className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
