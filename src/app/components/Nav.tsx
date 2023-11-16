import { useRef, useState } from "react";
import { RankingsMenu } from "./RankingsMenu";
import { StatsMenu } from "./StatsMenu";
import { ToolsMenu } from "./ToolsMenu";
import { ArticlesMenu } from "./ArticlesMenu";
import { SlideWrapper } from "./SlideWrapper";
import Link from "next/link";

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
      className="bg-white w-full fixed z-50"
      // onMouseEnter={() => setHovering(null)}
      onMouseLeave={() => setHovering(null)}
    >
      <div
        className="max-w-screen-lg flex justify-between mx-auto py-4 px-2"
        onMouseLeave={() => setHovering(null)}
      >
        <div>
          <Link href="/">Logo</Link>
        </div>
        <div className="basis-1/5" onMouseEnter={() => setHovering(null)}></div>
        <div className="hidden relative sm:flex justify-evenly w-3/4 max-w-screen-md">
          <Link
            href="/rankings"
            onFocus={(e) => handleOnFocus(0, e)}
            onMouseEnter={(e) => handleOnFocus(0, e)}
            className="flex gap-1 hover:bg-emerald-200 p-2 rounded"
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
            className="flex gap-1 hover:bg-emerald-200 p-2 rounded"
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
            className="flex gap-1 hover:bg-emerald-200 p-2 rounded"
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
            className="flex gap-1 hover:bg-emerald-200 p-2 rounded"
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
            className="flex gap-1 hover:bg-emerald-200 p-2 rounded"
            onMouseEnter={() => setHovering(null)}
          >
            News
          </Link>
          {typeof hovering === "number" && (
            <div
              className={`absolute top-14 shadow-lg bg-white rounded transition-all ${
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
          className="flex flex-col justify-evenly sm:hidden"
          onClick={() => {
            setNavOpen(!navOpen);
            const homePage = document.getElementById("home-page");
            homePage?.classList.toggle("blur-sm");
            const footer = document.getElementsByTagName("footer");
            footer[0].classList.toggle("blur-sm");
          }}
        >
          <div className="bg-black w-6 h-0.5"></div>
          <div className="bg-black w-6 h-0.5"></div>
          <div className="bg-black w-6 h-0.5"></div>
        </div>
        {navOpen && (
          <div className="absolute right-0 top-14 bg-white/90 h-screen w-screen">
            <ul className="p-4 flex flex-col items-center h-1/3 justify-evenly text-center">
              <li className="bg-emerald-700 w-full rounded">
                <Link href="/">Home</Link>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <Link href="/rankings">Rankings</Link>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <Link href="/stats">Stats</Link>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <Link href="/tools">Tools</Link>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <Link href="/articles">Articles</Link>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <Link href="/news">News</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
