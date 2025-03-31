"use client";

import { DndContext, DragEndEvent, Over } from "@dnd-kit/core";
import Groups from "./_components/Groups";
import Tasks from "./_components/Tasks";
import Users from "./_components/Users";
import { useContextAPI } from "../context/context";
import { handleDragEnd as handleDragEndUtils } from "@/lib/utils";

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
    </div>
  );
}
