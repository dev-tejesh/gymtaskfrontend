import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/user/signup", {
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
    // axios
    //   .post("http://localhost:5000/api/user/signup", {
    //     email: email,
    //     password: password,
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       localStorage.setItem("user", response);
    //       dispatch({ type: "Login", payload: response });
    //       setError(null);

    //       console.log("user signed up successfully", response);
    //       dispatch({ type: "", payload: response.data });
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     setError(response.error);
    //   });
  };

  return { signup, isLoading, error };
};
