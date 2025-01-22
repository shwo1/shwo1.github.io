'use client';
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { DialogConfirm } from "@/components/shadcn-ui/dialog";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = inputRef.current?.value.trim();
    if (!name) {
      setErrorMessage("Name cannot be empty");
      return;
    }
    setErrorMessage(null);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    const name = inputRef.current?.value.trim();
    router.push(`/game?player=${name}`);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-32">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
        />
        <div className="text-lg bg-gradient-to-r from-[#d57372] via-[#d2a684] to-[#6c9b7c] bg-clip-text text-transparent">
          A quiz game to guess music note
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 mb-4 h-10">
            <Input
              ref={inputRef}
              placeholder="Enter your name"
              className="font-sans"
            />
            {errorMessage && (
              <span className="text-red-500 font-sans text-sm font-medium">{errorMessage}</span>
            )}
          </div>
          <div className="text-center mt-5">
            <Button type="submit" className="text-xl rounded-full">
              Play!
            </Button>
          </div>
        </form>
      </div>
      <DialogConfirm
        className="font-sans"
        isOpen={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Alert"
        message="Sound will be played! Make sure your environment is suitable."
      />
    </main>
  );
}
