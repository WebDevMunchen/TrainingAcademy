import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Navbar() {
  const { isLoading, user, logout } = useContext(AuthContext);

  const countUnreadMessages = (messages) => {
    return messages.filter((message) => message.status === "unread").length;
  };

  const unreadMessagesCount = user ? countUnreadMessages(user.message) : 0;

  return (
    <>
      {!isLoading && (
        <nav className="flex justify-between lg:justify-between bg-gray-800 text-white w-full">
          <div className="px-2 xl:flex items-center">
            <NavLink to={"/"}>
              <img
                className="max-w-none h-16"
                src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1720595800/logo_profile_b5hxd7.png"
                alt="logo"
              />
            </NavLink>
          </div>
          {!user ? (
            <div className="px-2 xl:px-12 py-3 flex items-center">
              <NavLink
                to={"/login"}
                className={
                  "flex px-4 mx-auto font-semibold font-heading space-x-12"
                }
              >
                Anmelden
              </NavLink>
            </div>
          ) : (
            <>
              {user.role === "user" || user.role === "ASP" ? (
                <>
                  <div className="px-2 xl:px-12 py-3 ml-20 flex w-full items-center">
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                      <li>
                        <NavLink to={"/classes"}>Schulungsübersicht</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/classesOverview"}>
                          Meine Schulungen
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={"/datenschutz"}>Datenschutz</NavLink>
                      </li> */}
                      <li className="relative">
                        <NavLink to={"/messages"}>
                          <svg
                            className="w-8 h-8 text-amber-300 animate-wiggle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21 21"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
                            />
                          </svg>
                          <span
                            className={`${
                              unreadMessagesCount === 0
                                ? "hidden"
                                : "px-2 bg-red-500 rounded-full text-center text-white text-sm absolute -top-3 -end-4"
                            }`}
                          >
                            {unreadMessagesCount}
                            <span className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></span>
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="px-2 xl:px-12 py-3 flex items-center">
                    <NavLink
                      className={
                        "hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12"
                      }
                      onClick={logout}
                    >
                      Abmelden
                    </NavLink>
                  </div>
                  <div className="lg:hidden dropdown dropdown-end mr-6 mt-1.5 items-center">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-800 rounded-box w-52"
                    >
                      <li>
                        <NavLink to={"/classes"}>Schulungsübersicht</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/classesOverview"}>
                          Meine Schulungen
                        </NavLink>
                      </li>
                      <li>
  <NavLink to={"/messages"}>
    Nachrichten
    <span
      className={`${
        unreadMessagesCount === 0
          ? "hidden"
          : "flex items-center justify-center px-2 bg-red-500 rounded-full text-white text-sm w-5 h-5"
      }`}
    >
      {unreadMessagesCount}
      <span className="rounded-full animate-ping bg-teal-200 w-full h-full"></span>
    </span>
  </NavLink>
</li>

                      {/* <li>
                        <NavLink to={"/datenschutz"}>Datenschutz</NavLink>
                      </li> */}
                      <li>
                        <NavLink to={"/"} onClick={logout}>
                          Abmelden
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              ) : user.role === "teacher" ? (
                <>
                  <div className="px-2 xl:px-12 py-3 ml-20 flex w-full items-center">
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                      <li>
                        <NavLink to={"/classes"}>Schulungsübersicht</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="px-2 xl:px-12 py-3 flex items-center">
                    <NavLink
                      className={
                        "hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12"
                      }
                      onClick={logout}
                    >
                      Abmelden
                    </NavLink>
                  </div>
                  <div className="lg:hidden dropdown dropdown-end mr-6 mt-1.5 items-center">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-800 rounded-box w-52"
                    >
                      <li>
                        <NavLink to={"/classes"}>Schulungsübersicht</NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={"/datenschutz"}>Datenschutz</NavLink>
                      </li> */}
                      <li>
                        <NavLink to={"/"} onClick={logout}>
                          Abmelden
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="hidden lg:inline ml-20 py-3">
                    <ul className="flex gap-12 items-center font-semibold font-heading mt-2">
                      <li>
                        <NavLink to={"/classesOverview"}>
                          Meine Schulungen
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/classes"}>Schulungsübersicht</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={"/datenschutz"}>Datenschutz</NavLink>
                      </li> */}
                    </ul>
                  </div>
                  <div className="px-2 xl:px-12 py-3 flex items-center">
                    <NavLink
                      className={
                        "hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12"
                      }
                      onClick={logout}
                    >
                      Abmelden
                    </NavLink>
                  </div>

                  <div className="lg:hidden dropdown dropdown-end mr-6 mt-1.5 items-center">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-800 rounded-box w-52"
                    >
                      <li>
                        <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/classes"}>Schulungsübersicht</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/createClass"}>
                          Neue Schulung Erstellen
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/classesOverview"}>
                          Meine Schulungen
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to={"/admin/users"}>Benutzer Liste</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/register"}>
                          Benutzer Registrieren
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={"/datenschutz"}>Datenschutz</NavLink>
                      </li> */}
                      <li>
                        <NavLink to={"/"} onClick={logout}>
                          Abmelden
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
        </nav>
      )}
    </>
  );
}
