"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // const setUser = useAccountStore((state) => state.setUser)
  // useEffect(() => {
  // 	if (userData) {
  // 		setUser(userData)
  // 	}
  // }, [userData])
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors />
    </QueryClientProvider>
  );
}
