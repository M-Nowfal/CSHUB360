import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useHistory = (): boolean => {

  const { pathname } = useLocation();
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  useEffect(() => {
    if (pathname === "/")
      setCanGoBack(false);
    else
      setCanGoBack(true);
  }, [pathname]);

  return canGoBack;
}

export default useHistory;
