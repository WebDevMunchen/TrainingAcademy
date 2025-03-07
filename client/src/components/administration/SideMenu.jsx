import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function SideMenu() {
  const location = useLocation();

  const { logout } = useContext(AuthContext);

  return (
    <>
      <aside className="hidden lg:inline bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 inset-0 z-50 my-4 ml-4 h-[calc(93vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <p className="flex items-center justify-center gap-4 pt-6 pb-4 px-8">
            <span className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-white">
              Click & Train
            </span>
          </p>
          <p className="flex items-center justify-center gap-4 px-8 mb-4">
            <span className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-white">
              Rent.Group | München
            </span>
          </p>
          <button
            className="middle none  font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-sm text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <NavLink
                to={"/admin/dashboard"}
                className={
                  location.pathname === "/admin/dashboard" ? "active" : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/dashboard"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                  </svg>
                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Dashboard
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/users"}
                className={location.pathname === "/admin/users" ? "active" : ""}
              >
                <button
                  className={
                    location.pathname === "/admin/users"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Benutzerübersicht
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/register"}
                className={
                  location.pathname === "/admin/register" ? "active" : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/register"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Benutzerregistrierung
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/createClass"}
                className={
                  location.pathname === "/admin/createClass" ? "active" : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/createClass"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>

                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Neue Schulung
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/classInterest"}
                className={
                  location.pathname === "/admin/classInterest" ? "active" : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/classInterest" ||
                    location.pathname === "/admin/classInterest/create" ||
                    location.pathname === "/admin/classInterest/userOverview"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                  >
                    <path
                      fill="currentColor"
                      d="M18.171 6.829a3.16 3.16 0 0 1 .761 1.238l.498 1.53a.605.605 0 0 0 1.14 0l.498-1.53a3.15 3.15 0 0 1 1.998-1.996l1.53-.497a.605.605 0 0 0 0-1.14l-.03-.008l-1.531-.497a3.15 3.15 0 0 1-1.998-1.996L20.54.403a.604.604 0 0 0-1.14 0l-.498 1.53l-.013.038a3.15 3.15 0 0 1-1.955 1.958l-1.53.497a.605.605 0 0 0 0 1.14l1.53.497c.467.156.89.418 1.237.766m8.65 3.529l.918.298l.019.004a.362.362 0 0 1 0 .684l-.919.299a1.9 1.9 0 0 0-1.198 1.197l-.299.918a.363.363 0 0 1-.684 0l-.299-.918a1.89 1.89 0 0 0-1.198-1.202l-.919-.298a.362.362 0 0 1 0-.684l.919-.299a1.9 1.9 0 0 0 1.18-1.197l.299-.918a.363.363 0 0 1 .684 0l.298.918a1.89 1.89 0 0 0 1.199 1.197M11.768 3.496a4.25 4.25 0 0 1 4.036-.232l-.715.236a1.57 1.57 0 0 0-.79.59q-.094.131-.16.276a2.75 2.75 0 0 0-1.583.406l-8.908 5.496l8.847 5.785a2.75 2.75 0 0 0 3.01 0l6.048-3.955a1.3 1.3 0 0 0 .356.181l.94.31a.85.85 0 0 1 .34.21l.013.013l-1.202.786v6.652c0 .296-.162.48-.353.666c-.095.092-.231.22-.409.372a11.3 11.3 0 0 1-1.54 1.105C18.366 23.193 16.421 24 14 24c-2.42 0-4.366-.807-5.698-1.607a11.3 11.3 0 0 1-1.54-1.105a9 9 0 0 1-.41-.372c-.19-.187-.352-.367-.352-.666v-6.652l-3-1.961v6.113a.75.75 0 0 1-1.5 0V10.5q0-.065.01-.125a.75.75 0 0 1 .346-.763zM7.5 14.579v5.358q.097.09.238.212c.302.26.752.608 1.335.958c1.168.7 2.848 1.393 4.927 1.393c2.08 0 3.76-.693 4.927-1.393a10 10 0 0 0 1.573-1.17v-5.358l-4.174 2.73a4.25 4.25 0 0 1-4.652 0z"
                    ></path>
                  </svg>

                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Interesse
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/approverList"}
                className={
                  location.pathname === "/admin/approverList" ? "active" : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/approverList" ||
                    location.pathname === "/admin/approverListSubstitute"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                    <circle cx="8.5" cy="7" r="4" />{" "}
                    <polyline points="17 11 19 13 23 9" />
                  </svg>

                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Genehmiger
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/sendMessage"}
                className={
                  location.pathname === "/admin/sendMessage" ? "active" : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/sendMessage"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Benachrichtigen
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/allClassesStatistic"}
                className={
                  location.pathname === "/admin/allClassesStatistic"
                    ? "active"
                    : ""
                }
              >
                <button
                  className={
                    location.pathname === "/admin/cancelationStatistic" ||
                    location.pathname ===
                      "/admin/approverCancelationStatistic" ||
                    location.pathname === "/admin/allClassesStatistic"
                      ? "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                      : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  }
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>

                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Statistik
                  </p>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logout}>
                <button
                  className="middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block antialiased  text-base leading-relaxed text-inherit font-medium capitalize">
                    Abmelden
                  </p>
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
