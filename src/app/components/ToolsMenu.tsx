import { forwardRef } from "react";

export const ToolsMenu = forwardRef<HTMLElement>(function ToolsMenu(
  props,
  ref
) {
  return (
    <section ref={ref} className="flex justify-start p-2 w-full min-w0">
      <div className="flex flex-col grow shrink-0 self-stretch p-2 text-sm">
        <h3 className="font-bold">IN-SEASON</h3>
        <a href="/" className="p-1">
          Tool
        </a>
        <a href="/" className="p-1">
          Tool
        </a>
        <a href="/" className="p-1">
          Tool
        </a>
        <a href="/" className="p-1">
          Tool
        </a>
      </div>
      <div className="flex flex-col grow shrink-0 p-2 text-sm">
        <h3 className="font-bold">DRAFT</h3>
        <a href="/" className="p-1">
          Tool
        </a>
        <a href="/" className="p-1">
          Tool
        </a>
        <a href="/" className="p-1">
          Tool
        </a>
      </div>
    </section>
  );
});
