import { Bird } from "lucide-react";
import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        {/* <Image src="/empty.png" fill alt="Empty" /> */}
        <Bird width={256} height={256} className="text-gray-100"></Bird>
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
