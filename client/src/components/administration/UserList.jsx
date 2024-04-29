import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import UserListCard from "./UserListCard";
import { NavLink } from "react-router-dom";
import SideMenu from "./SideMenu";

export default function UserList() {
  const { allUsers } = useContext(AuthContext);

  return (
    <>
      {!allUsers ? (
        <p>Loading...</p>
      ) : (
        <>
      <div className="min-h-screen bg-gray-50/50 flex">

        <SideMenu />
        <div className="mt-8 bg-white p-4 shadow rounded-lg w-10/12 mr-auto ml-auto">
          <h2 className="text-gray-500 text-lg font-semibold pb-4">
            Benutzerübersicht
          </h2>
          <div className="my-1"></div>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-sm leading-normal">
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Vorname
                </th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Nachname
                </th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Abteilung
                </th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  E-Mail Adresse
                </th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Status
                </th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="">
              {allUsers.map((user) => {
                return <UserListCard key={user._id} user={user} />;
              })}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <NavLink
              to={"/admin/dashboard"}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
            >
              Zurück
            </NavLink>
          </div>
        </div>
        </div>
        </>
      )}
    </>
  );
}
