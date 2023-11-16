import Link from "next/link";
import { forwardRef } from "react";

export const RankingsMenu = forwardRef<HTMLElement>(function RankingsMenu(
  props,
  ref
) {
  return (
    <section ref={ref} className="flex justify-start p-2 text-sm">
      <div className="flex flex-col grow shrink-0 p-4">
        <h3 className="font-bold">CURRENT WEEK</h3>
        <Link href="/rankings/ppr" className="p-1">
          PPR Rankings
        </Link>
        <Link href="/rankings/half-ppr" className="p-1">
          Half PPR Rankings
        </Link>
        <Link href="/rankings/standard" className="p-1">
          Standard Rankings
        </Link>
      </div>
      <div className="flex flex-col grow shrink-0 p-4">
        <h3 className="font-bold">REST OF SEASON</h3>
        <a href="/rankings/ros-ppr" className="p-1">
          PPR Rankings
        </a>
        <a href="/rankings/ros-half-ppr" className="p-1">
          Half PPR Rankings
        </a>
        <a href="/rankings/ros-standard" className="p-1">
          Standard Rankings
        </a>
      </div>
    </section>
  );
});
