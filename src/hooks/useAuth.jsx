import { useSelector } from "react-redux";
import { getAuth } from "../fetures/auth/authSlice";
const useAuth = () => {
  const { user, message, error } = useSelector(getAuth);
  return { user, message, error };
};

export default useAuth;
