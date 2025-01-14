import React, { useEffect, useState } from "react";
import Column from "./Components/Column";
import { IColumn, ITask } from "./Interface/interfaces";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const columns: IColumn[] = [
  { title: "To Do", id: 1, color: "bg-[#ff746c]" },
  { title: "In Progress", id: 2, color: "bg-[#b09c8d]" },
  { title: "Completed", id: 3, color: "bg-[#a4ac86]" },
];


const getInitialTasks = (): ITask[] => {
  const savedTasks = localStorage.getItem("kanbanTasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return [];
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>(getInitialTasks());

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: ITask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId =
      typeof active.id === "string" ? parseInt(active.id) : active.id;
    const newColumnId =
      typeof over.id === "string" ? parseInt(over.id) : over.id;

    if (isNaN(taskId) || isNaN(newColumnId)) {
      console.error("Invalid ID detected");
      return;
    }
    setTasks((prevTasks) => {
      console.log("Previous tasks:", prevTasks);
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      );
      console.log("Updated tasks:", updatedTasks);
      return updatedTasks;
    });
  }

  return (
    <div className="bg-[#ebe3d2] min-h-screen h-fit mb-10">
      <header className="flex bg-[#414833] h-24 text-5xl text-gray-400 font-bold">
        <span className="m-auto">KANBAN BOARD</span>
      </header>
      <main className="flex gap-10 justify-evenly my-5">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              task={tasks.filter((task) => task.columnId === column.id)}
              addTask={addTask}
            />
          ))}
        </DndContext>
      </main>
    </div>
  );
};

export default App;
