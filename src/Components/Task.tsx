import React from "react";
import { ITask } from "../Interface/interfaces";
import { useDraggable } from "@dnd-kit/core";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: `transform 0.3 ease`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="h-15px w-full bg-[#e1e2e2] rounded-md p-1 cursor-pointer"
    >
      {task.title}
    </div>
  );
};

export default Task;
