import { forwardRef } from "react";

export const StatsMenu = forwardRef<HTMLElement>(function StatsMenu(
  props,
  ref
) {
  return (
    <section ref={ref} className="flex justify-start px-2 py-0">
      <div className="flex flex-col grow shrink-0 p-4 flex-1 text-sm">
        <a href="/" className="p-1">
          Stat
        </a>
        <a href="/" className="p-1">
          Stat
        </a>
        <a href="/" className="p-1">
          Stat
        </a>
      </div>
    </section>
  );
});
