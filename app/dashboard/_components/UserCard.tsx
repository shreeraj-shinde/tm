"use client";
import { User } from "@/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MdGroups } from "react-icons/md";
import { FiTarget } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin7Line } from "react-icons/ri";

export default function UserCard({ user }: { user: User }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: user.id ?? "",
    data: user,
  });
  const { setNodeRef: setNodeRef2, isOver } = useDroppable({
    id: user.id ?? "",
    data: user,
  });
  return (
    <div
      ref={setNodeRef2}
      className={`transition-all duration-300 rounded-lg ${
        isOver ? "border-2 border-purple-900" : ""
      }`}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ transform: CSS.Translate.toString(transform) }}
        className="p-4 shadow-lg shadow-gray-200 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-600 tracking-wide font-semibold">
            {user.name}
          </h3>
          <button className="text-gray-500 cursor-pointer">
            <RiDeleteBin7Line />
          </button>
        </div>

        <h3 className="text-xs text-gray-600">{user.email}</h3>

        <div className="my-2">
          <h3 className="flex items-center gap-2 text-gray-700 text-xs font-semibold tracking-wide">
            Groups <MdGroups /> :{" "}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.Group?.map((grp) => (
              <span
                className="flex items-center gap-2 p-2 bg-gray text-[10px] px-2 py-1 rounded-md bg-black text-white"
                key={grp.id}>
                {grp.name}
                <button>
                  <RxCross1 />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="my-2">
          <h3 className="text-gray-700 flex items-center gap-2 text-xs font-semibold tracking-wide">
            Tasks <FiTarget /> :{" "}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.Task?.map((grp) => (
              <span
                key={grp.id}
                className=" flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-orange-100 text-orange-500 border border-orange-500">
                {grp.title}
                <button>
                  <RxCross1 />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
