import { createContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { badCredentials } from "../utils/badCredentials";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [approver, setApprover] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allActivities, setAllActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(
    new Date()
      .toLocaleDateString("de-DE", { month: "long" })
      .toLocaleLowerCase()
  );

  useEffect(() => {
    axiosClient
      .get("/user/profile")
      .then((response) => {
        if (response.data.status === "inaktiv") {
          setUser(null);
        } else {
          setUser(response.data);
        }
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get(`/classActivity/allActivities?month=${currentMonth}`)
      .then((response) => {
        setAllActivities(response.data);
      })
      .catch((error) => {
        setAllActivities(null);
      });

    axiosClient
      .get("/user/getAllUsers")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        setAllUsers(null);
      });

    axiosClient
      .get("/approver/approverList")
      .then((response) => {
        setApprover(response.data);
      })
      .catch((error) => {
        setApprover(null);
      });
  }, [currentMonth, setAllActivities]);

  const handleNextMonth = () => {
    const months = [
      "januar",
      "februar",
      "märz",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "dezember",
    ];
    const currentMonthIndex = months.findIndex(
      (month) => month === currentMonth
    );
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    setCurrentMonth(months[nextMonthIndex]);
  };

  const handlePreviousMonth = () => {
    const months = [
      "januar",
      "februar",
      "märz",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "dezember",
    ];
    const currentMonthIndex = months.findIndex(
      (month) => month === currentMonth
    );
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    setCurrentMonth(months[previousMonthIndex]);
  };

  const login = async (data) => {
    axiosClient
      .post("/user/login", data)
      .then((response) => {
        setUser(response.data);
        navigate("/");

        return axiosClient.get("/user/getAllUsers");
      })
      .then((usersResponse) => {
        setAllUsers(usersResponse.data);

        return axiosClient.get(
          `classActivity/allActivities?month=${currentMonth}`
        );
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);

        return axiosClient.get(`/approver/approverList`);
      })
      .then((responseApprovers) => {
        setApprover(responseApprovers.data);
      })
      .catch((error) => {
        badCredentials();
        setUser(null);
        setAllUsers(null);
        setApprover(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .post("/user/logout")
      .then((response) => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {});
  };

  const signup = async (data) => {
    axiosClient
      .post("/user/register", data)
      .then((response) => {
        return axiosClient.get(`user/getAllUsers`);
      })
      .then((response) => {
        setAllUsers(response.data);
        navigate("/admin/users");
      })
      .catch((error) => {
        notifyErrorRegister();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const notifyErrorRegister = () => {
    toast.error(
      `Registrierung fehlgeschlagen. Benutzer bereits registriert oder ungültige Daten`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "mt-14 mr-6 w-80",
      }
    );
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          login,
          logout,
          signup,
          handleNextMonth,
          handlePreviousMonth,
          setUser,
          setIsLoading,
          setAllActivities,
          setAllUsers,
          notifyErrorRegister,
          setApprover,
          approver,
          user,
          allUsers,
          allActivities,
          isLoading,
          currentMonth,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
