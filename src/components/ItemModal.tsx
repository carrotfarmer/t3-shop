import type { ListItem } from "@prisma/client";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ListItem[]>>;
}

export const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [name, setName] = useState<string>("");

  const { mutate: addItem } = trpc.item.addItem.useMutation({
    onSuccess: (item) => {
      setItems((prev) => [...prev, item]);
    },
  });

  return (
    <div className="bg-black-75 absolute inset-0 flex items-center justify-center">
      <div className="space-y-4 rounded-2xl bg-gray-200 p-10">
        <h3 className="text-xl font-medium">name of item</h3>
        <input
          type="text"
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600"
            onClick={() => {
              addItem({ name });
              setModalOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
