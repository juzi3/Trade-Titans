import { useRef, useState } from "react";
import { RankingsMenu } from "./RankingsMenu";
import { SlideWrapper } from "./SlideWrapper";
import Link from "next/link";
import { Permanent_Marker } from "next/font/google";
import Image from "next/image";
import logo from "../../../public/assets/FFTA-Logo-Light.png";

const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverLeft, setPopoverLeft] = useState<number | null>(null);
  const [popoverCenter, setPopoverCenter] = useState<number | null>(null);
  const [popoverHeight, setPopoverHeight] = useState<number | null>(null);
  const [popoverWidth, setPopoverWidth] = useState<number | null>(null);
  const refs = useRef<(HTMLElement | null)[]>([]);

  const handleOnFocus = (idx: number, e: any) => {
    const target = e.target.getBoundingClientRect();
    setHovering(idx);
    setPopoverCenter(
      e.currentTarget.offsetLeft - e.currentTarget.offsetWidth / 2
    );
    const menuElement = refs.current[idx];
    if (menuElement) {
      setPopoverHeight(menuElement.offsetHeight);
    }
  };

  return (
    <nav
      className="bg-dark-secondary w-full fixed z-50 h-20 shadow-lg"
      onMouseLeave={() => setHovering(null)}
    >
      <div
        className="max-w-screen-lg flex justify-between items-center mx-auto py-4 px-2"
        onMouseLeave={() => setHovering(null)}
      >
        <div>
          <Link href="/">
            <Image src={logo} alt="Trade Titans Logo" height={60} />
          </Link>
        </div>
        <div className="basis-1/5" onMouseEnter={() => setHovering(null)}></div>
        <div className="hidden relative sm:flex justify-evenly w-3/4 max-w-screen-md items-center">
          <Link
            href="/rankings"
            onFocus={(e) => handleOnFocus(0, e)}
            onMouseEnter={(e) => handleOnFocus(0, e)}
            className="flex gap-1 hover:bg-white p-2 rounded font-medium"
          >
            Rankings
            <p
              className={`transition-rotate transform max-h-10 ${
                hovering === 0 ? "rotate-180" : "rotate-0"
              }`}
            >
              &#9663;
            </p>
          </Link>
          {typeof hovering === "number" && (
            <div
              className={`absolute top-12 shadow-xl bg-white rounded transition-all ${
                hovering !== null
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } duration-300`}
              style={{
                left: popoverCenter || 0,
                height: popoverHeight || 300,
                width: 350,
              }}
            >
              <SlideWrapper index={0} hovering={hovering}>
                <RankingsMenu ref={(element) => (refs.current[0] = element)} />
              </SlideWrapper>
            </div>
          )}
        </div>
        <div
          id="burger-menu"
          className="h-8 flex flex-col justify-evenly sm:hidden"
          onClick={() => {
            setNavOpen(!navOpen);
          }}
        >
          <div
            className={`bg-black w-7 h-1 rounded transition-all duration-300 ease-out ${
              navOpen ? "-rotate-45 translate-y-1.5" : "translate-y-0"
            }`}
          ></div>
          <div
            className={`bg-black w-7 h-1 rounded transition-all duration-300 ease-out ${
              navOpen ? "rotate-45 -translate-y-1.5" : "translate-y-0"
            }`}
          ></div>
        </div>
        {navOpen && (
          <div className="absolute right-0 top-20 bg-light-secondary/90 h-screen w-screen backdrop-blur-md">
            <ul className="py-4 flex flex-col items-center h-96 justify-evenly text-center">
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium text-lg"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium text-lg"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/rankings"
                >
                  Rankings
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
