"use client";
import { useEffect, useState } from "react";
import { Task } from "@/types";
import { tasks as initialTasks } from "../data/tasks";
import TasksCard from "./TasksCard";
import { GrAdd } from "react-icons/gr";
import Drawer from "@/app/components/Drawer";
import AddTaskForm from "./AddTaskForm";
import { fetchTasks } from "@/app/services/task.service";
import { useContextAPI } from "@/app/context/context";
export default function Tasks() {
  const { tasks, setTasks } = useContextAPI();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks as unknown as Task[]);
    };
    getTasks();
  }, []);

  return (
    <div className="p-2 px-4 flex-1 h-full">
      {/* {FLEX} */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
          Tasks
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 justify-center bg-purple-800 transition-all duration-300 hover:bg-purple-900 text-white px-4 py-2 rounded-md">
          <GrAdd />
          Add Task
        </button>
      </div>
      {/* DIVIDER */}
      <div className="h-[1.5px] m-2 w-full bg-gray-200"></div>
      {/* {TASKS} */}
      {tasks.map((task) => (
        <TasksCard key={task.id} task={task} />
      ))}
      <Drawer open={open} form={<AddTaskForm />} setOpen={setOpen}></Drawer>
    </div>
  );
}
