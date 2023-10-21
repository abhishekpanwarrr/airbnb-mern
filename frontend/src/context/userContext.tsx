import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { apiServer } from "../config/config";
export interface User {
  email: string;
  name: string;
  __v: number;
  _id: string;
}
export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  ready?: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Assuming you store the token in local storage
    if (!user) {
      axios
        .get(`${apiServer}profile`, { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
          setReady(true)
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
