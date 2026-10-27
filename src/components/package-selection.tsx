"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type PackageSelection = { selectedPackage: string; selectPackage: (id: string) => void };

const PackageSelectionContext = createContext<PackageSelection | null>(null);

/** Damit „Paket anfragen“ das Paket im Anfrageformular vorauswählt. */
export function PackageSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, selectPackage] = useState("");

  return <PackageSelectionContext.Provider value={{ selectedPackage, selectPackage }}>{children}</PackageSelectionContext.Provider>;
}

export function usePackageSelection(): PackageSelection {
  const context = useContext(PackageSelectionContext);

  if (!context) {
    throw new Error("usePackageSelection muss innerhalb von <PackageSelectionProvider> verwendet werden.");
  }

  return context;
}
