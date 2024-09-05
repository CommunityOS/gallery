"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { ElementRef, forwardRef, useState, useEffect } from "react";
import { Footer } from "../../src/features/footer";
import { ScrollArea } from "../../src/components/ui/scroll-area";

const Child = forwardRef<
  ElementRef<typeof motion.div>,
  { children: React.ReactNode }
>((props, ref) => {
  return (
    <motion.div
      ref={ref}
      id="client-layout"
      className="flex-1 flex flex-col overflow-hidden"
      // initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <ScrollArea className="flex flex-1">
        {props.children}
        <Footer />
      </ScrollArea>
    </motion.div>
  );
});

Child.displayName = "Child";

export default function TransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const [prevSegment, setPrevSegment] = useState(segment);

  useEffect(() => {
    if (segment !== prevSegment) {
      setPrevSegment(segment);
    }
  }, [segment, prevSegment]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Child key={prevSegment}>{children}</Child>
    </AnimatePresence>
  );
}
