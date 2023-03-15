import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

interface IAuthContextData {
  isAuth: boolean;
}

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let auth = false;
    if (typeof window !== "undefined") {
      const accessToken = Boolean(localStorage.getItem("accessToken"));
      if (!accessToken) auth = false;
      else auth = true;
    }

    const isAuthRoute = router.pathname.indexOf("private") > -1;

    if (!auth && isAuthRoute) {
      router.push("signin");
    } else if (auth && !isAuthRoute) {
      router.push("private");
    }

    setIsAuth(auth);
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};
