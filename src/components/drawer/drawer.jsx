import { useEffect } from "react";
import useThemeStore from "../../store/themeStore";
import { useLocation } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";


function Drawer() {
  const location = useLocation();
  const path = location.pathname;
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const htmlTag = document.querySelector("html");

  useEffect(() => {
    htmlTag?.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "wireframe" ? "dark" : "wireframe";
    setTheme(newTheme);
  };

  return (
    <>
      <aside
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border-r">
          <ul className="space-y-2 font-medium h-full flex flex-col justify-between">
            <div className="first flex flex-col gap-2">
              <li className="text-xl font-bold rounded-xl my-5">
                <a href="/" className="flex items-center justify-center">
                  <img src="src/assets/logo.png" className="w-16" alt="" />
                </a>
              </li>
              <div className="divider"></div>
              <li
                className={`pointer ${
                  path === "/playstation-demo" ? "bg-gray-200 rounded-md" : ""
                }`}
              >
                <a
                  className="flex items-center p-2 text-gray-500 rounded-md hover:bg-gray-100"
                  href="/deals"
                >
                  <span className="ml-2 text-sm">Deals</span>
                </a>
              </li>
              <div className="divider"></div>
              <li
                className={`pointer ${
                  path === "/thanks" ? "bg-gray-200 rounded-md" : ""
                }`}
              >
                <a
                  target="_blank"
                  className="flex items-center p-2 text-gray-500 rounded-md hover:bg-gray-100"
                  href="https://cicekli.me"
                >
                  <span className="ml-2 text-sm">Abdullah Çiçekli</span>
                </a>
              </li>
            </div>
            <div className="flex items-center">
              <button
                className="btn btn-ghost btn-circle"
                onClick={toggleTheme}
              >
                <div className="indicator">
                  {theme === "wireframe" ? (
                    <MoonIcon className="h-5" />
                  ) : (
                    <SunIcon className="h-5" />
                  )}
                </div>
              </button>
            </div>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Drawer;
