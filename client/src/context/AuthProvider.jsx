import { createContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { badCredentials } from "../utils/badCredentials";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [approver, setApprover] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [allInterest, setAllInterest] = useState([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(
    new Date()
      .toLocaleDateString("de-DE", { month: "long" })
      .toLocaleLowerCase()
  );
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    axiosClient
      .get("/user/profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoadingActivities(true);

    axiosClient
      .get(
        `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
      )
      .then((response) => {
        setAllActivities(response.data || []);
      })
      .catch((error) => {
        setAllActivities([]);
      })
      .finally(() => {
        setIsLoadingActivities(false);
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
      .get("/activityInterest/getEveryInterest")
      .then((response) => {
        setAllInterest(response.data);
      })
      .catch((error) => {
        setAllInterest(null);
      });

    axiosClient
      .get("/approver/approverList")
      .then((response) => {
        setApprover(response.data);
      })
      .catch((error) => {
        setApprover(null);
      });
  }, [currentMonth, currentYear]);

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

  const handleYearChange = (e) => {
    setCurrentYear(e.target.value);
  };

  const login = async (data, redirectUrl) => {
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
          `classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
        );
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);

        return axiosClient.get(`/approver/approverList`);
      })
      .then((responseApprovers) => {
        setApprover(responseApprovers.data);

        return axiosClient.get("/activityInterest/getEveryInterest");
      })
      .then((response) => {
        setAllInterest(response.data);

        navigate(redirectUrl || "/");
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
        toast.success("Benutzer registriert!")
      })
      .catch((error) => {
        toast.error(
          `Registrierung fehlgeschlagen. Benutzer bereits registriert oder ungültige Daten`
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          handleYearChange,
          setUser,
          setIsLoading,
          setAllActivities,
          setAllUsers,
          setApprover,
          setAllInterest,
          allInterest,
          approver,
          user,
          allUsers,
          allActivities,
          isLoading,
          currentMonth,
          currentYear,
          isLoadingActivities,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
