"use client";

import { DndContext, DragEndEvent, Over } from "@dnd-kit/core";
import Groups from "./_components/Groups";
import Tasks from "./_components/Tasks";
import Users from "./_components/Users";
import { useContextAPI } from "../context/context";
import { handleDragEnd as handleDragEndUtils } from "@/lib/utils";
import { useEffect } from "react";
import { fetchTasks } from "../services/task.service";
import { Group, Task } from "@/types";
import { getGroups } from "../services/group.service";
import { fetchUsers } from "../services/user.service";
import { ToastContainer } from "react-toastify";
export default function Dashboard() {
  const { tasks, setTasks, groups, setGroups, users, setUsers } =
    useContextAPI();
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active, over);
    if (active.id === over?.id) return;
    handleDragEndUtils(
      active,
      over as Over,
      setUsers,
      setGroups,
      setTasks,
      users,
      groups,
      tasks
    );
  }

  const getData = async () => {
    try {
      const [tasksData, groupsData, usersData] = await Promise.all([
        fetchTasks(),
        getGroups(),
        fetchUsers(),
      ]);

      setTasks(tasksData);
      setGroups(groupsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-1">
          <Users />
          <div className="flex-1 h-full flex flex-col gap-1">
            <Groups />
            <Tasks />
          </div>
        </div>
      </DndContext>
      <ToastContainer />
    </div>
  );
}
