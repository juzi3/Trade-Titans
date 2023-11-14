import { forwardRef } from "react";

export const Menu1 = forwardRef<HTMLElement>(function Menu1(props, ref) {
  return <section ref={ref}>Menu</section>;
});
