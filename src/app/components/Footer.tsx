const Footer = () => {
  return (
    <footer className="bg-black w-full h-48 py-4 px-2 absolute bottom-0 text-sm">
      <div className="max-w-screen-lg sm:w-full h-full flex flex-col items-center justify-evenly mx-auto text-white bg-slate-900">
        <div>Logo</div>
        <div className="flex">
          <a href="">GitHub</a>
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
