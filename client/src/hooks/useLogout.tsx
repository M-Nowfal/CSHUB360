import { useDispatch } from "react-redux";
import { clearStudent } from "../redux/slice/studentSlice";
import { clearInstructor } from "../redux/slice/instructorSlice";
import { setRole } from "../redux/slice/roleSlice";
import useFetch from "./useFetch";
import { setAuthState } from "../redux/slice/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const { refetch } = useFetch("/auth/logout", "PATCH", {}, {}, true);

  const logout = async () => {
    try {
      await refetch(undefined, undefined, true);
    } catch (error: unknown) {
      console.error("Logout error:", error);
    } finally {
      // Clear Redux state
      dispatch(clearStudent());
      dispatch(clearInstructor());
      dispatch(setAuthState(false));
      dispatch(setRole("student"));
    }
  };

  return { logout };
};
