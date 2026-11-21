"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { BookingModal } from "./BookingModal";

type BookingCtx = { isOpen: boolean; open: () => void; close: () => void };

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

/**
 * Owns the single CTA's state. Also hosts LazyMotion (smaller motion bundle)
 * and MotionConfig so every animation respects prefers-reduced-motion.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const open = useCallback(() => {
    setHasOpened(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <Ctx.Provider value={value}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          {children}
          {hasOpened && <BookingModal open={isOpen} onClose={close} />}
        </MotionConfig>
      </LazyMotion>
    </Ctx.Provider>
  );
}
