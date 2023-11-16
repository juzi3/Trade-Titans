import { forwardRef } from "react";

export const ArticlesMenu = forwardRef<HTMLElement>(function ArticlesMenu(
  props,
  ref
) {
  return (
    <section ref={ref} className="flex justify-start px-2 py-0">
      <div className="flex flex-col grow shrink-0 p-4 text-sm">
        <a href="/" className="p-1">
          Trade Advice
        </a>
        <a href="/" className="p-1">
          Sleepers
        </a>
        <a href="/" className="p-1">
          Busts
        </a>
      </div>
    </section>
  );
});
