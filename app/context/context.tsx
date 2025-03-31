"use client";
import { Task, Group, User, Context as ContextType } from "@/types";
import { createContext, SetStateAction, useContext, useState } from "react";

export const Context = createContext<ContextType>({
  groups: [],
  setGroups: () => {},
  tasks: [],
  setTasks: () => {},
  users: [],
  setUsers: () => {},
});

export const useContextAPI = () => useContext(Context);
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  return (
    <Context.Provider
      value={{ groups, setGroups, tasks, setTasks, users, setUsers }}>
      {children}
    </Context.Provider>
  );
};
