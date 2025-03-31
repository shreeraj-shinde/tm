import { getGroups } from "@/app/services/group.service";
import {
  assignTaskToGroup,
  assignTaskToUser,
  fetchTasks,
} from "@/app/services/task.service";
import { addUserToGroup } from "@/app/services/user.service";
import { fetchUsers } from "@/app/services/user.service";
import { Group, Task, User } from "@/types";
import { Active, Over } from "@dnd-kit/core";

export const handleDragEnd = async (
  active: Active,
  over: Over,
  setUsers: (users: User[]) => void,
  setGroups: (groups: Group[]) => void,
  setTasks: (tasks: Task[]) => void,
  users: User[],
  groups: Group[],
  tasks: Task[]
) => {
  if (active.id === over?.id) return;
  if (active.id && over?.id) {
    if (
      active.data.current?.type === "USER" &&
      over.data.current?.type === "GROUP"
    ) {
      const response = await addUserToGroup(
        active.id as string,
        over.id as string
      );
      const updatedGroups = await getGroups();
      const updatedTasks = await fetchTasks();
      setUsers(response);
      setGroups(updatedGroups);
      setTasks(updatedTasks);
    }
    if (
      active.data.current?.type === "GROUP" &&
      over.data.current?.type === "USER"
    ) {
      const response = await addUserToGroup(
        over.id as string,
        active.id as string
      );
      const updatedGroups = await getGroups();
      const updatedTasks = await fetchTasks();
      setUsers(response);
      setGroups(updatedGroups);
      setTasks(updatedTasks);
    }
    if (
      active.data.current?.type === "TASK" &&
      over.data.current?.type === "USER"
    ) {
      const response = await assignTaskToUser(
        active.id as string,
        over.id as string
      );
      const updatedUsers = await fetchUsers();
      const updatedTasks = await fetchTasks();
      setUsers(updatedUsers);
      setTasks(updatedTasks);
    }
    if (
      active.data.current?.type === "USER" &&
      over.data.current?.type === "TASK"
    ) {
      const response = await assignTaskToUser(
        over.id as string,
        active.id as string
      );
      const updatedUsers = await fetchUsers();
      const updatedTasks = await fetchTasks();
      setUsers(updatedUsers);
      setTasks(updatedTasks);
    }
    if (
      active.data.current?.type === "TASK" &&
      over.data.current?.type === "GROUP"
    ) {
      const response = await assignTaskToGroup(
        active.id as string,
        over.id as string
      );
      const updatedTasks = await fetchTasks();
      const updatedGroups = await getGroups();
      const updatedUsers = await fetchUsers();
      setTasks(updatedTasks);
      setGroups(updatedGroups);
      setUsers(updatedUsers);
    }
    if (
      active.data.current?.type === "GROUP" &&
      over.data.current?.type === "TASK"
    ) {
      const response = await assignTaskToGroup(
        over.id as string,
        active.id as string
      );
      const updatedTasks = await fetchTasks();
      const updatedGroups = await getGroups();
      const updatedUsers = await fetchUsers();
      setTasks(updatedTasks);
      setGroups(updatedGroups);
      setUsers(updatedUsers);
    }
  }
};
