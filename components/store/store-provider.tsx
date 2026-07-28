"use client";

import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store";

interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
  const [reduxStore] = useState<AppStore>(() => store());

  return <Provider store={reduxStore}>{children}</Provider>;
}
