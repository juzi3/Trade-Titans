export const SlideWrapper = ({
  index,
  hovering,
  children,
}: {
  index: number;
  hovering: number | null;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`absolute inset-x-0 mx-auto transition-all duration-300 p-2 ${
        hovering === index ? "opactiy-100" : "opacity-0 pointer-events-none"
      }${
        hovering === index
          ? "transform-none"
          : hovering && hovering > index
          ? "-translate-x-24"
          : "translate-x-24"
      }`}
    >
      {children}
    </div>
  );
};
