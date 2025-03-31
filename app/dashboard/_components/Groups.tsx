"use client";
import Drawer from "@/app/components/Drawer";
import { useContextAPI } from "@/app/context/context";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import AddGroupForm from "./AddGroupForm";
import GroupCard from "./GroupCard";
export default function Groups() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { groups, setGroups } = useContextAPI();

  return (
    <div className="p-2 px-4 flex-1 h-full rounded-lg shadow-lg">
      {/* {FLEX} */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
          Groups
        </h3>
        <button
          onClick={() => setOpenDrawer(!openDrawer)}
          className="flex text-[12px] items-center gap-2 justify-center bg-purple-800 transition-all duration-300 hover:bg-purple-900 text-white px-3 py-2 rounded-md"
        >
          <GrAdd />
          Add Group
        </button>
      </div>
      {/* DIVIDER */}
      <div className="h-[1.5px] m-2 w-full bg-gray-200"></div>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
      <Drawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        form={<AddGroupForm />}
      />
    </div>
  );
}
