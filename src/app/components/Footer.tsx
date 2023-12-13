import Image from "next/image";
import logo from "../../../public/assets/FFTA-Logo-Dark.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-primary w-full h-48 py-4 px-2 absolute bottom-0 text-sm">
      <div className="max-w-screen-sm sm:w-full h-full flex flex-col items-center justify-evenly mx-auto text-white">
        <div>
          <Link href="/">
            <Image src={logo} alt="Trade Titans Logo" height={80} />
          </Link>
        </div>
        <div className="flex">
          <Link
            href="https://github.com/juzi3/Fantasy-Football-Trade-Analyzer"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
        <div className="flex w-full justify-evenly">
          <Link href="">Help</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          <Link href="">Terms</Link>
          <Link href="">Privacy</Link>
        </div>
        {/* <div>
          <p>Copyright</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
