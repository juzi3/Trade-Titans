const Footer = () => {
  return (
    <footer className="bg-slate-900 w-full h-48 py-4 px-2 absolute bottom-0 text-sm">
      <div className="max-w-screen-lg sm:w-full h-full flex flex-col items-center justify-evenly mx-auto text-white">
        <div>
          <a href="/">Logo</a>
        </div>
        <div className="flex">
          <a
            href="https://github.com/juzi3/Fantasy-Football-Trade-Analyzer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <div className="flex w-full justify-evenly">
          <a href="">Help</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Terms</a>
          <a href="">Privacy</a>
        </div>
        <div>
          <p>Copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
