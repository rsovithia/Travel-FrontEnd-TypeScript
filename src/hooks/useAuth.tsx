import { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth/auth";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return { authenticated };
};

export default useAuth;
