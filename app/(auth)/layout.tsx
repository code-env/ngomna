import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  if (userId) {
    return redirect("/d");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
