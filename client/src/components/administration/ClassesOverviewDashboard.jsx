import ClassesSchedule from "../user/ClassesSchedule";
import SideMenu from "./SideMenu";
// import ClassesSchedule from "../user/ClassesSchedule";

export default function ClassesOverviewDashboard() {

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 flex">
        <SideMenu />
        <div className=" w-10/12 overflow-y-auto max-h-[900px]">
          <ClassesSchedule />
        </div>
      </div>
    </>
  );
}
