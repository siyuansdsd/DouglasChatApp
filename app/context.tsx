import { createContext, useContext, useState } from "react";

const UserContext = createContext<{
  u: string;
  setU: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [u, setU] = useState("");

  return (
    <UserContext.Provider value={{ u, setU }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
