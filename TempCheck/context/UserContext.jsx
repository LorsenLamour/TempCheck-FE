import React, { createContext, useState, useMemo, useCallback } from "react";
import TestData from "../data/testUser.json";

export const UsersContext = createContext({
  users: new Map(),
  addAUser: () => {},
});

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(new Map(Object.entries(TestData)));

  const addAUser = useCallback((key, value) => {
    setUsers(prev => {
      const newUser = new Map(prev);
      newUser.set(key, value);
      return newUser;
    });
  }, []);

  const value = useMemo(() => ({ users, addAUser }), [users, addAUser]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}
