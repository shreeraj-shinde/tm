import { SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;

  form?: React.ReactNode;
}
export default function Drawer({ open, setOpen, form }: DrawerProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-10 z-10"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`${
          open ? "w-[50vw]" : "w-0"
        } h-screen fixed -right-10 top-0 bg-white shadow-l-md p-4 transition-all duration-400 z-20`}
      >
        <div className="w-full flex justify-between items-center">
          <button className="text-xl" onClick={() => setOpen(!open)}>
            <RxCross1 />
          </button>
        </div>

        {form}
      </div>
    </>
  );
}
