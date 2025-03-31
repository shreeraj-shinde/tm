"use client";
import { useState } from "react";
export default function Sidebar() {
  return (
    <div
      className={`h-screen transition-all duration-400 hover:w-70 w-20 bg-purple-950 sticky top-0`}>
      <div className="h-full w-full">
        <div className="flex items-center justify-center pt-4">
          <h1 className="text-xl font-semibold text-white uppercase tracking-wide">
            logo
          </h1>
        </div>
      </div>
    </div>
  );
}
