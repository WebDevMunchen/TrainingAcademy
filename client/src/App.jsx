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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Protected />}>
          <Route path="/:id" element={<SingleClassDetails />} />
          <Route path="/classes" element={<ClassesSchedule />} />
          <Route path="/classesOverview" element={<ClassesOverview />} />
          <Route path="/admin" element={<Authorize role="admin" />}>
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="userProfile/:id" element={<UserInfoCard />} />
            <Route
              path="classesOverview"
              element={<ClassesOverviewDashboard />}
            />
            <Route path="createClass" element={<CreateClass />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
