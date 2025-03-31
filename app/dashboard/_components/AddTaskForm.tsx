"use client";
import { useState } from "react";
import { Task } from "@/types";
import { addTask } from "@/app/services/task.service";
import { useContextAPI } from "@/app/context/context";
export default function AddTaskForm() {
  const { setTasks, tasks } = useContextAPI();
  const [formData, setFormData] = useState<Task>({
    title: "",
    type: "TASK",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await addTask(formData);
    setTasks([...tasks, response]);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Add Task
        </button>
      </form>
    </div>
  );
}
