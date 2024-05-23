import ClassesSchedule from "../user/ClassesSchedule";
import SideMenu from "./SideMenu";

export default function ClassesOverviewDashboard() {
  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className=" w-10/12 overflow-y-auto max-h-[820px]">
          <ClassesSchedule />
        </div>
      </div>
    </>
  );
}
