"use client";
import { User } from "@/types";
import { useState } from "react";

import Drawer from "@/app/components/Drawer";
import { useContextAPI } from "@/app/context/context";
import { GrAdd } from "react-icons/gr";
import AddUserForm from "./AddUserForm";
import UserCard from "./UserCard";
export default function Users() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { users } = useContextAPI();

  return (
    <div className="p-2 px-4 bg-slate-50 flex-1 rounded-lg shadow-lg">
      {/* {FLEX} */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
          Users
        </h3>
        <button
          onClick={() => setOpenDrawer(!openDrawer)}
          className="flex text-[12px] items-center gap-2 justify-center bg-purple-800 transition-all duration-300 hover:bg-purple-900 text-white px-3 py-2 rounded-md"
        >
          <GrAdd />
          Add User
        </button>
      </div>
      {/* DIVIDER */}
      <div className="h-[1.5px] m-2 w-full bg-gray-200"></div>
      {/* {USERS} */}
      {users.map((user) => (
        <UserCard key={user.id} user={user as User} />
      ))}
      <Drawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        form={<AddUserForm />}
      />
    </div>
  );
}
