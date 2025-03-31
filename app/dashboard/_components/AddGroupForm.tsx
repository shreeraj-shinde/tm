import { createGroup } from "@/app/services/group.service";
import { useState } from "react";
import { Group } from "@prisma/client";
import { useContextAPI } from "@/app/context/context";

export default function AddGroupForm() {
  const { groups, setGroups } = useContextAPI();
  const [formData, setFormData] = useState({
    name: "",
    type: "GROUP",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createGroup(formData as Group);
    console.log(response);
    setFormData({
      name: "",
      type: "GROUP",
    });
    setGroups([...groups, response as Group]);
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
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Add Group
        </button>
      </form>
    </div>
  );
}
