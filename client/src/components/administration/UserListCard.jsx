import { NavLink } from "react-router-dom";

export default function UserListCard({ user }) {
  return (
    <>
      <tr className="hover:bg-grey-lighter text-center">
        <td className="py-2 px-4 border-b border-grey-light">
          {user.firstName}
        </td>
        <td className="py-2 px-4 border-b border-grey-light">
          {user.lastName}
        </td>
        <td className="py-2 px-4 border-b border-grey-light">
          {user.department}
        </td>
        <td className="py-2 px-4 border-b border-grey-light">
          {user.email}
        </td>
        <td className="py-2 px-4 border-b border-grey-light">
          {user.status}
        </td>
        <td className="py-2 px-4 border-b border-grey-light">
          <NavLink className={"block antialiased font-sans text-xs font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125"} to={`/${user._id}`}>Mehr</NavLink>
        </td>
      </tr>
    </>
  );
}
