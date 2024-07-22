"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const CustomSubmitButton = ({
  isLoading,
  className,
  children,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex gap-2 items-center justify-center">
          <Loader className="animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomSubmitButton;
