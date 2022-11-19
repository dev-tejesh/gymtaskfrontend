import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          const json = response.data;
          await dispatch({ type: "LOGIN", payload: response.data });
          console.log("response successfful");
          setError(null);
          //   console.log("user signed up successfully", response);
        }
        if (!response.ok) {
          setIsLoading(false);
          console.log(response.error);
          setError(response.error);
        }
      })
      .catch((error) => {
        console.log("came");
        console.log(error.response.data.error);
        setIsLoading(false);
        setError(error.response.data.error);
      });
   
  };

  return { login, isLoading, error };
};
