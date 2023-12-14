import { useRef, useState } from "react";
import { RankingsMenu } from "./RankingsMenu";
import { StatsMenu } from "./StatsMenu";
import { ToolsMenu } from "./ToolsMenu";
import { ArticlesMenu } from "./ArticlesMenu";
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

  const handleOnFocus = (
    idx: number,
    // e:
    //   | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    //   | React.FocusEvent<HTMLAnchorElement, Element>
    e: any
  ) => {
    const target = e.target.getBoundingClientRect();
    // console.log(target, e.target, "first console.log");
    setHovering(idx);
    // setPopoverLeft(e.currentTarget.offsetLeft);
    setPopoverCenter(
      e.currentTarget.offsetLeft - e.currentTarget.offsetWidth / 2
    );
    const menuElement = refs.current[idx];
    if (menuElement) {
      setPopoverHeight(menuElement.offsetHeight);
      // setPopoverWidth(menuElement.offsetWidth);
    }
  };

  return (
    <nav
      className="bg-dark-secondary w-full fixed z-50 h-20 shadow-lg"
      // onMouseEnter={() => setHovering(null)}
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
          <Link
            href="/stats"
            onFocus={(e) => handleOnFocus(1, e)}
            onMouseEnter={(e) => handleOnFocus(1, e)}
            className="flex gap-1 hover:bg-white p-2 rounded font-medium"
          >
            Stats
            <p
              className={`transition-rotate transform max-h-10 ${
                hovering === 1 ? "rotate-180" : "rotate-0"
              }`}
            >
              &#9663;
            </p>
          </Link>
          <Link
            href="/tools"
            onFocus={(e) => handleOnFocus(2, e)}
            onMouseEnter={(e) => handleOnFocus(2, e)}
            className="flex gap-1 hover:bg-white p-2 rounded font-medium"
          >
            Tools
            <p
              className={`transition-rotate transform max-h-10 ${
                hovering === 2 ? "rotate-180" : "rotate-0"
              }`}
            >
              &#9663;
            </p>
          </Link>
          <Link
            href="/articles"
            onFocus={(e) => handleOnFocus(3, e)}
            onMouseEnter={(e) => handleOnFocus(3, e)}
            className="flex gap-1 hover:bg-white p-2 rounded font-medium"
          >
            Articles
            <p
              className={`transition-rotate transform max-h-10 ${
                hovering === 3 ? "rotate-180" : "rotate-0"
              }`}
            >
              &#9663;
            </p>
          </Link>
          <Link
            href="/news"
            className="flex gap-1 hover:bg-white p-2 rounded font-medium"
            onMouseEnter={() => setHovering(null)}
          >
            News
          </Link>
          {typeof hovering === "number" && (
            <div
              className={`absolute top-12 shadow-lg bg-white rounded transition-all ${
                hovering !== null
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } duration-300`}
              style={{
                // left: popoverLeft || 0,
                // left: popoverLeft / 2 || 0,
                left: popoverCenter || 0,
                height: popoverHeight || 300,
                width: hovering === 0 ? 350 : hovering === 2 ? 200 : 150,
                // width: popoverWidth || 300,
              }}
            >
              <SlideWrapper index={0} hovering={hovering}>
                <RankingsMenu ref={(element) => (refs.current[0] = element)} />
              </SlideWrapper>
              <SlideWrapper index={1} hovering={hovering}>
                <StatsMenu ref={(element) => (refs.current[1] = element)} />
              </SlideWrapper>
              <SlideWrapper index={2} hovering={hovering}>
                <ToolsMenu ref={(element) => (refs.current[2] = element)} />
              </SlideWrapper>
              <SlideWrapper index={3} hovering={hovering}>
                <ArticlesMenu ref={(element) => (refs.current[3] = element)} />
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
            <ul className="mt-2 py-4 flex flex-col items-center h-2/5 justify-evenly text-center">
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium"
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
                  className="font-medium"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/rankings"
                >
                  Rankings
                </Link>
              </li>
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/stats"
                >
                  Stats
                </Link>
              </li>
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/tools"
                >
                  Tools
                </Link>
              </li>
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/articles"
                >
                  Articles
                </Link>
              </li>
              <li className="w-full border-b-solid border-b py-4 border-b-dark-secondary/50">
                <Link
                  className="font-medium"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                  href="/news"
                >
                  News
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
