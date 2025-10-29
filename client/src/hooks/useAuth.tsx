import { useEffect } from "react";
import useFetch from "./useFetch";
import { setStudent } from "../redux/slice/studentSlice";
import { setInstructor } from "../redux/slice/instructorSlice";
import { setRole } from "../redux/slice/roleSlice";
import { setAuthState } from "../redux/slice/authSlice";
import { useAppDispatch } from "../redux/hooks";

const useAuth = (): void => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useFetch("/auth/me", "GET", undefined, undefined, true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        refetch("/auth/me");
      } catch (error) {
        // User is not authenticated, clear stored data
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (data && data.user) {
      const { user, role } = data;

      dispatch(setRole(role));
      dispatch(setAuthState(true));

      switch (role) {
        case "student":
          dispatch(setStudent(user));
          break;
        case "instructor":
          dispatch(setInstructor(user));
          break;
      }
    }
  }, [data]);
};

export default useAuth;
