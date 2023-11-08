import { useState } from "react";

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-white w-full py-4 px-2">
      <div className="max-w-screen-lg flex justify-between mx-auto">
        <div>Logo</div>
        <div className="hidden sm:flex justify-evenly w-3/4 max-w-screen-md">
          <div className="hover:bg-emerald-200 p-2 rounded">Rankings</div>
          <div className="hover:bg-emerald-200 p-2 rounded">Stats</div>
          <div className="hover:bg-emerald-200 p-2 rounded">Tools</div>
          <div className="hover:bg-emerald-200 p-2 rounded">Articles</div>
          <div className="hover:bg-emerald-200 p-2 rounded">News</div>
        </div>
        <div
          id="burger-menu"
          className="flex flex-col justify-evenly sm:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          <div className="bg-black w-6 h-0.5"></div>
          <div className="bg-black w-6 h-0.5"></div>
          <div className="bg-black w-6 h-0.5"></div>
        </div>
        {navOpen && (
          <div className="absolute right-0 top-14 bg-white/90 h-screen w-screen z-50">
            <ul className="p-4 flex flex-col items-center h-1/3 justify-evenly text-center">
              <li className="bg-emerald-700 w-full rounded">Home</li>
              <li className="bg-emerald-700 w-full rounded">Rankings</li>
              <li className="bg-emerald-700 w-full rounded">Stats</li>
              <li className="bg-emerald-700 w-full rounded">Tools</li>
              <li className="bg-emerald-700 w-full rounded">Articles</li>
              <li className="bg-emerald-700 w-full rounded">News</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
