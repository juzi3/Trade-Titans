import { useState } from "react";
import { Menu0 } from "./Menu0";
import { Menu1 } from "./Menu1";
import { Menu2 } from "./Menu2";
import { Menu3 } from "./Menu3";

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverLeft, setPopoverLeft] = useState<number | null>(null);
  const [popoverHeight, setPopoverHeight] = useState<number | null>(null);

  return (
    <nav
      className="bg-white w-full py-4 px-2 fixed z-50"
      onMouseLeave={() => setHovering(null)}
    >
      <div className="max-w-screen-lg flex justify-between mx-auto">
        <div>
          <a href="/">Logo</a>
        </div>
        <div className="hidden sm:flex justify-evenly w-3/4 max-w-screen-md">
          <a
            href="/rankings"
            className="hover:bg-emerald-200 p-2 rounded"
            onMouseEnter={(e) => {
              setHovering(0);
              setPopoverLeft(e.currentTarget.offsetLeft);
            }}
          >
            Rankings
          </a>
          <a
            href="/stats"
            className="hover:bg-emerald-200 p-2 rounded"
            onMouseEnter={(e) => {
              setHovering(1);
              setPopoverLeft(e.currentTarget.offsetLeft);
            }}
          >
            Stats
          </a>
          <a
            href="/tools"
            className="hover:bg-emerald-200 p-2 rounded"
            onMouseEnter={(e) => {
              setHovering(2);
              setPopoverLeft(e.currentTarget.offsetLeft);
            }}
          >
            Tools
          </a>
          <a
            href="/articles"
            className="hover:bg-emerald-200 p-2 rounded"
            onMouseEnter={(e) => {
              setHovering(3);
              setPopoverLeft(e.currentTarget.offsetLeft);
            }}
          >
            Articles
          </a>
          <a
            href="/news"
            className="hover:bg-emerald-200 p-2 rounded"
            onMouseEnter={() => setHovering(null)}
          >
            News
          </a>
        </div>
        {typeof hovering === "number" && (
          <div
            className="absolute top-20 shadow-lg bg-white p-5 rounded w-[600px] transition-all duration-300"
            style={{ left: popoverLeft ?? 0 }}
          >
            {hovering === 0 ? (
              <Menu0 />
            ) : hovering === 1 ? (
              <Menu1 />
            ) : hovering === 2 ? (
              <Menu2 />
            ) : hovering === 3 ? (
              <Menu3 />
            ) : null}
          </div>
        )}
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
                <a href="/">Home</a>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <a href="/rankings">Rankings</a>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <a href="/stats">Stats</a>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <a href="/tools">Tools</a>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <a href="/articles">Articles</a>
              </li>
              <li className="bg-emerald-700 w-full rounded">
                <a href="/news">News</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
