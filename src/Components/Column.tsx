import React, { useState } from "react";
import { IColumn, ITask } from "../Interface/interfaces";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  column: IColumn;
  task: ITask[];
  addTask: (newTask: ITask) => void;
}

const Column: React.FC<ColumnProps> = ({ column, task, addTask }) => {
  const [title, setTitle] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addEvent = () => {
    if (title.trim() === "") return;

    const newTask: ITask = {
      title: title,
      id: Date.now(), 
      columnId: column.id,
    };

    addTask(newTask);
    setTitle("");
  };


const { setNodeRef} = useDroppable({
  id: column.id,
  data: {
    type: "column",
    columnId: column.id,
  },
});

  return (
    <div
      ref={setNodeRef} 
      className={`w-64 min-h-96 text-center ${column.color} h-fit border rounded-lg border-black`}
    >
      <span className="text-xl">{column.title}</span>
      <hr className="border border-gray-300 w-10/12 mx-auto my-2" />
      <div className="flex gap-2 w-full items-center justify-center">
        <input
          className="border rounded-lg p-1"
          name="title"
          value={title}
          onChange={onChangeHandler}
        />
        <button
          className="border border-black rounded-lg p-1 w-12 bg-[#ebe3d2]"
          onClick={addEvent}
        >
          Add
        </button>
      </div>
      <hr className="border border-gray-300 my-2" />
      <div className="flex flex-col gap-2 p-2">
        {task.map((taskItem) => (
          <Task key={taskItem.id} task={taskItem} />
        ))}
      </div>
    </div>
  );
};

export default Column;
