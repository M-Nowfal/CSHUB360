import useAuth from "../../hooks/useAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuth(); // This will check auth status on mount
  
  return <>{children}</>;
};
