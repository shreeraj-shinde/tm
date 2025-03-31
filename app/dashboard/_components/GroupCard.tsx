"use client";
import { Group } from "@/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegUser, FaRegListAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export default function GroupCard({ group }: { group: Group }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: group.id,
    data: group,
  });
  const { setNodeRef: setNodeRef2, isOver } = useDroppable({
    id: group.id,
    data: group,
  });

  return (
    <div
      ref={setNodeRef2}
      className={`mt-2 transition-all duration-300 rounded-lg ${
        isOver ? "border-2 border-purple-900" : ""
      }`}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ transform: CSS.Translate.toString(transform) }}
        className="p-2 px-4 bg-slate-50 flex-1 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-600 tracking-wide font-semibold">
            {group.name}
          </h3>
          <button className="text-gray-500 cursor-pointer">
            <RiDeleteBin7Line />
          </button>
        </div>
        <div className="my-2">
          <h3 className="text-gray-700 flex items-center gap-2 text-xs font-semibold tracking-wide">
            Users <FaRegUser /> :{" "}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {group.users?.map((user) => (
              <span
                className="px-2 flex items-center gap-1 py-1 text-[10px] rounded-md bg-purple-300 text-purple-900 border border-purple-900"
                key={user.id}>
                {user.name}
                <button>
                  <RxCross1 />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="my-2">
          <h3 className="text-gray-700 flex items-center gap-2 text-xs font-semibold tracking-wide">
            Tasks <FaRegListAlt /> :{" "}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {group.Task?.map((task) => (
              <span
                key={task.id}
                className=" flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-orange-100 text-orange-500 border border-orange-500">
                {task.title}
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
