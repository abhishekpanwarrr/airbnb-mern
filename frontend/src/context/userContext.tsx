import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
