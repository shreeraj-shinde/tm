import { Task } from "@/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
export default function TasksCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id as string,
    data: task,
  });
  const { setNodeRef: setNodeRef2, isOver } = useDroppable({
    id: task.id as string,
    data: task,
  });
  return (
    <div
      ref={setNodeRef2}
      className={`mt-2transition-all duration-300 rounded-lg ${
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
            {task.title}
          </h3>
          <button className="text-gray-500 cursor-pointer">
            <RiDeleteBin7Line />
          </button>
        </div>
        <div className="my-2">
          <h3 className="flex items-center gap-2 text-gray-700 text-xs font-semibold tracking-wide">
            Groups <MdGroups /> :{" "}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {task.assignedToGroup?.map((grp) => (
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
          <h3 className="text-gray-700 flex items-center gap-2 text-[10px] font-semibold tracking-wide">
            Users <FaRegUser /> :{" "}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {task.assignedTo?.map((user) => (
              <span
                className="px-2 flex  items-center gap-1 py-1 text-[10px] rounded-md bg-purple-300 text-purple-900 border border-purple-900"
                key={user.id}>
                {user.name}
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
