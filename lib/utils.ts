import { Group, Task, User } from "@/types";
import { Over, Active } from "@dnd-kit/core";
import {
  assignTaskToGroup,
  assignTaskToUser,
  fetchTasks,
} from "@/app/services/task.service";
import { getGroups } from "@/app/services/group.service";
import { addUserToGroup, fetchUsers } from "@/app/services/user.service";
import { toast } from "react-toastify";

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
  if (!active.id || !over?.id) return;

  try {
    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Handle User-Group interactions
    if (
      (activeType === "USER" && overType === "GROUP") ||
      (activeType === "GROUP" && overType === "USER")
    ) {
      const userId = activeType === "USER" ? active.id : over.id;
      const groupId = activeType === "GROUP" ? active.id : over.id;

      // Optimistically update users
      const updatedUsers = await addUserToGroup(
        userId as string,
        groupId as string
      );
      setUsers(updatedUsers);

      // Only fetch groups since they're affected
      const [updatedGroups, updatedTasks] = await Promise.all([
        getGroups(),
        fetchTasks(),
      ]);
      setGroups(updatedGroups);
      setTasks(updatedTasks);

      toast.success("User added to group");
    }

    // Handle Task-User interactions
    else if (
      (activeType === "TASK" && overType === "USER") ||
      (activeType === "USER" && overType === "TASK")
    ) {
      const taskId = activeType === "TASK" ? active.id : over.id;
      const userId = activeType === "USER" ? active.id : over.id;

      // Update tasks directly with the response
      const updatedTask = await assignTaskToUser(
        taskId as string,
        userId as string,
        tasks
      );

      const [updatedUsers, updatedTasks] = await Promise.all([
        fetchUsers(),
        fetchTasks(),
      ]);
      setUsers(updatedUsers);
      setTasks(updatedTasks);

      toast.success("Task assigned to user");
    }

    // Handle Task-Group interactions
    else if (
      (activeType === "TASK" && overType === "GROUP") ||
      (activeType === "GROUP" && overType === "TASK")
    ) {
      const taskId = activeType === "TASK" ? active.id : over.id;
      const groupId = activeType === "GROUP" ? active.id : over.id;

      // Update tasks directly with the response
      const updatedTasks = await assignTaskToGroup(
        taskId as string,
        groupId as string,
        tasks
      );
      setTasks(updatedTasks);

      const [updatedGroups, updatedUsers] = await Promise.all([
        getGroups(),
        fetchUsers(),
      ]);

      setGroups(updatedGroups);
      setUsers(updatedUsers);

      toast.success("Task assigned to group");
    }
  } catch (error) {
    console.error("Error in handleDragEnd:", error);
    // You might want to add error handling here, such as showing a notification
  }
};
