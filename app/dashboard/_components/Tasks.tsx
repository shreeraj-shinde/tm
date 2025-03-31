"use client";
import Drawer from "@/app/components/Drawer";
import { useContextAPI } from "@/app/context/context";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import AddTaskForm from "./AddTaskForm";
import TasksCard from "./TasksCard";
export default function Tasks() {
  const { tasks } = useContextAPI();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-2 px-4 flex-1 h-full shadow-lg rounded-lg">
      {/* {FLEX} */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
          Tasks
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="flex text-[12px] items-center gap-2 justify-center bg-purple-800 transition-all duration-300 hover:bg-purple-900 text-white px-4 py-2 rounded-md"
        >
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
