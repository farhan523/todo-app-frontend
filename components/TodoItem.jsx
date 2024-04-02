import React from "react";
import CheckCircleIcon from "@/public/icons/CheckCircleIcon";
import DotIcon from "@/public/icons/DotIcon";

export default function TodoItem({ task, deleteTask, completeTask ,editTodo,index,todo,setTodo,toast}) {
    return (
        <div className="flex hover-trigger relative border-b-2 justify-between border-[#b7b39b] items-center w-[100%] h-10 ">
            <div className="top-0 hover-target left-0 group-hover:flex  absolute flex-col flex justify-center w-[100%]  bg-white opacity-95 ">
                <p className="pl-2">
                    <span className="font-medium ">Completed : </span>
                    {task.completed ? "completed" : "Not Complete"}
                </p>
                <p className="pl-2">
                    <span className="font-medium">Created At:</span> {task.createdAt}
                </p>
                <div onClick={() => deleteTask(task._id, todo, setTodo, toast)} className="rounded hover:bg-red-400 cursor-pointer h-7 w-[95%] mb-3 bg-red-300 self-center flex items-center justify-center">
                    <p className="text-red-500">Delete</p>
                </div>
                <div onClick={() => editTodo(task._id, index, task.title)} className="rounded cursor-pointer  mb-3 hover:bg-yellow-500 h-7 w-[95%] bg-yellow-300 self-center flex items-center justify-center">
                    <p className="text-black">Edit</p>
                </div>
                <div onClick={() => completeTask(task._id, index, todo, setTodo, toast)} className="rounded cursor-pointer hover:bg-green-500 h-7 w-[95%] bg-green-300 self-center flex items-center justify-center">
                    <p className="text-green">Complete</p>
                </div>
            </div>
            <div className="pl-2 flex items-center">
                <CheckCircleIcon fill={task.completed ? "green" : "none"} />
                <p className="pl-2 hover-trigger2 text-black ">{task.title}</p>
            </div>
            <DotIcon />
        </div>
    );
}
