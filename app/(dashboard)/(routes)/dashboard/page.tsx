"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="grid-pattern">
      <div className="pt-20"></div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center uppercase">
          SELECT A TOOL TO generate
        </h2>
        {/* <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p> */}
      </div>
      <div className="px-4 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.href}
              onClick={() => router.push(tool.href)}
              className="border-black/5 hover:shadow-md transition cursor-pointer flex flex-col items-center justify-center p-4"
            >
              <div
                className={`p-2 w-full rounded-md ${tool.bgColor} flex justify-center`}
              >
                <Image
                  src={tool.icon}
                  alt={tool.label}
                  width={256}
                  height={256}
                  className={`${tool.color} rounded-lg`}
                />
              </div>
              <div className="font-semibold mt-2">{tool.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
