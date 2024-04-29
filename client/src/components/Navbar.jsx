import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import logo from "../assets/logo_profile.png";

export default function Navbar() {
  const { isLoading, user, logout } = useContext(AuthContext);

  return (
    <>
      {!isLoading && (
        <div className="flex flex-wrap">
          <section className="relative mx-auto">
            <nav className="flex justify-between bg-gray-800 text-white w-screen">
              <div className="px-2 xl:flex items-center">
                <NavLink to={"/"}>
                  <img className="max-w-none h-16" src={logo} alt="logo" />
                </NavLink>
              </div>
              {!user ? (
                <div className="px-2 xl:px-12 py-3 flex items-center">
                  <NavLink
                    to={"/login"}
                    className={
                      "hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12"
                    }
                  >
                    Anmelden
                  </NavLink>
                </div>
              ) : (
                <>
                  {user.role === "user" ? (
                    <>
                      <div className="px-2 xl:px-12 py-3 ml-20 flex w-full items-center">
                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                          <li>
                            <NavLink to={"/classes"}>
                              Schulungsübersicht
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={"/classesOverview"}>
                              Meine Schulungen
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={"/classes"}>Datenschutz</NavLink>
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
                    </>
                  ): user.role === "teacher" ? 
                  <>
                  <div className="px-2 xl:px-12 py-3 ml-20 flex w-full items-center">
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                      <li>
                        <NavLink to={"/classes"}>
                          Schulungsübersicht
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
                </>
                : (

                  <>
                  <div className="px-2 xl:px-12 py-3 ml-20 flex w-full items-center">
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                      <li>
                        <NavLink to={"/classes"}>
                          Schulungsübersicht
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/register"}>Benutzer Registrieren</NavLink>
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
                </>

                )}
                </>
              )}
            </nav>
          </section>
        </div>
      )}
    </>
  );
}
