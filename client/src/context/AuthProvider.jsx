import { createContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allActivities, setAllActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/user/profile")
      .then((response) => {
        setUser(response.data);
        console.log("User Profile", response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/classActivity/allActivities")
      .then((response) => {
        setAllActivities(response.data);
        console.log("All Activities", response.data);
      })
      .catch((error) => {
        console.log(error);
        setAllActivities(null);
      });

    axiosClient
      .get("/user/getAllUsers")
      .then((response) => {
        setAllUsers(response.data);
        console.log("All Users", response.data);
      })
      .catch((error) => {
        console.log(error);
        setAllUsers(null);
      });
  }, []);

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
      })
      .catch((error) => {
        console.error("Error:", error);
        setUser(null);
        setAllUsers(null)
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
      .catch((error) => {
        console.log(error);
      });
  };

  const signup = async (data) => {
    axiosClient
      .post("/user/register", data)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
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
          setUser,
          setIsLoading,
          setAllActivities,
          user,
          allUsers,
          allActivities,
          isLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
