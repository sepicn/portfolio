"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type SceneState = {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  focused: string | null;
  setFocused: (id: string | null) => void;
  lampOn: boolean;
  toggleLamp: () => void;
  scroll: { current: number };
};

const SceneContext = createContext<SceneState | null>(null);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [lampOn, setLampOn] = useState(true);
  const scroll = useMemo(() => ({ current: 0 }), []);

  const value = useMemo<SceneState>(
    () => ({
      hovered,
      setHovered,
      focused,
      setFocused,
      lampOn,
      toggleLamp: () => setLampOn((on) => !on),
      scroll,
    }),
    [hovered, focused, lampOn, scroll],
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used inside SceneProvider");
  return ctx;
}
