"use client";
import { useEffect, useState } from "react";
import { User } from "@/types";

import UserCard from "./UserCard";
import { GrAdd } from "react-icons/gr";
import Drawer from "@/app/components/Drawer";
import AddUserForm from "./AddUserForm";
import { fetchUsers } from "@/app/services/user.service";
import { useContextAPI } from "@/app/context/context";
export default function Users() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { users, setUsers } = useContextAPI();

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users as unknown as User[]);
    };
    getUsers();
  }, []);

  return (
    <div className="p-2 px-4 bg-slate-50 flex-1 rounded-lg shadow-lg">
      {/* {FLEX} */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
          Users
        </h3>
        <button
          onClick={() => setOpenDrawer(!openDrawer)}
          className="flex items-center gap-2 justify-center bg-purple-800 transition-all duration-300 hover:bg-purple-900 text-white px-4 py-2 rounded-md">
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
