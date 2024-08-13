import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Authorize from "./components/Authorize";
import Navbar from "./components/Navbar";
import SingleClassDetails from "./components/administration/SingleClassDetails";
import ClassesSchedule from "./components/user/ClassesSchedule";
import ClassesOverview from "./components/user/ClassesOverview";
import Register from "./components/administration/Register";
import Dashboard from "./components/administration/Dashboard";
import UserList from "./components/administration/UserList";
import ClassesOverviewDashboard from "./components/administration/ClassesOverviewDashboard";
import CreateClass from "./components/administration/CreateClass";
import UserInfoCard from "./components/administration/UserInfoCard";
import UpdateUser from "./components/administration/UpdateUser";
import EditClass from "./components/administration/EditClass";
import Report from "./components/administration/Report";
import AuthorizeNonUser from "./components/AuthorizeNonUser";
import { Bounce, ToastContainer } from "react-toastify";
import Datenschutz from "./components/user/Datenschutz";
import SingleClassDetailsAdmin from "./components/administration/SingleClassDetailsAdmin";
import ApproverList from "./components/administration/ApproverList";
import ApproverListSubstitute from "./components/administration/ApproverListSubstitute";
import PieChartSingle from "./components/administration/PieChartSingle";
import Messages from "./components/user/Messages";
import MessageForm from "./components/administration/MessageForm";
import AuthorizeMessages from "./components/AuthorizeMessages";
import PieCharStatisticsDecline from "./components/administration/PieChartStatisticsDecline";
import PieChartStornoStatistics from "./components/administration/PieChartStornoStatistics";
import PieChartAllClasses from "./components/administration/PieChartAllClasses";

function App() {
  const allowedRoles = ["admin", "teacher", "ASP"];
  const allowedRolesMessage = ["user", "ASP"];

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Protected />}>
          <Route path="/classes" element={<ClassesSchedule />} />
          <Route path="/classesOverview" element={<ClassesOverview />} />

          <Route path="/datenschutz" element={<Datenschutz />} />

          <Route
            path="/"
            element={<AuthorizeMessages roles={allowedRolesMessage} />}
          >
            <Route path="messages" element={<Messages />} />
          </Route>

          <Route
            path="/classInformation"
            element={<AuthorizeNonUser roles={allowedRoles} />}
          >
            <Route path=":id" element={<SingleClassDetails />} />
            <Route
              path="participation/:id"
              element={<SingleClassDetailsAdmin />}
            />
          </Route>
          <Route path="/admin" element={<Authorize role="admin" />}>
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="userProfile/:id" element={<UserInfoCard />} />
            <Route path="userProfile/update/:id" element={<UpdateUser />} />
            <Route
              path="classesOverview"
              element={<ClassesOverviewDashboard />}
            />
            <Route path="createClass" element={<CreateClass />} />
            <Route path="editClass/:id" element={<EditClass />} />
            <Route path="report/:id" element={<Report />} />
            <Route path="approverList" element={<ApproverList />} />
            <Route path="sendMessage" element={<MessageForm />} />
            <Route
              path="approverListSubstitute"
              element={<ApproverListSubstitute />}
            />
            <Route
              path="cancelationStatistic/:id"
              element={<PieChartSingle />}
            />
            <Route
              path="cancelationStatistic"
              element={<PieChartStornoStatistics />}
            />
            <Route
              path="approverCancelationStatistic"
              element={<PieCharStatisticsDecline />}
            />
            <Route
              path="allClassesStatistic"
              element={<PieChartAllClasses />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
