import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import PlusIcon from "@/public/icons/PlusIcon";
import ListIcon from "@/public/icons/ListIcon";
import ChevronIcon from "@/public/icons/ChevronIcon";
import { toast } from "react-toastify";

import addTodo from "./utilities/addTodo";
import deleteTask from "./utilities/deleteTodo";
import completeTask from "./utilities/completeTask";
import updateTodo from "./utilities/updateTodo";
import getAllTodo from "./utilities/getAllTodo"

import TodoItem from "@/components/TodoItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [todo, setTodo] = useState([]);
    const [text, setText] = useState("");
    const [load,setLoad]  = useState(true)
    const [edit, setEdit] = useState({
        id: null,
        set: false,
        index: null
    });

    async function editTodo(id, index, title) {
        setEdit({
            set: true,
            id: id,
            index: index
        });
        setText(title);
    }

    function cancelEdit() {
        setEdit({
            set: false,
            id: null,
            index: null
        });
    }

    useEffect(() => {
        getAllTodo(setTodo,toast,setLoad);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen  shadow-inner  bg-[url('../public/images/image.png')]  bg-cover bg-center backdrop-blur   bg-no-repeat">
            <div className="w-10   flex flex-col items-center" style={{ width: 400, height: 500,}}>
                <div style={{}} className="rounded-full min-w-24 min-h-24 bg-center bg-cover bg-origin-content pt-5 bg-[url('../public/images/profile.jpg')] "></div>
                <div className="w-5/6 h-9 shadow-md bg-white  rounded mt-5 flex items-center">
                    <input
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        placeholder="Add new task"
                        type="text"
                        className="p-2 text-black w-[90%] h-full rounded outline-none"
                    ></input>
                    {edit.set ? (
                        <>
                            <p onClick={() => updateTodo(todo, setTodo, setText, toast, text, edit, setEdit)} className="p-1 bg-red-300 rounded cursor-pointer hover:bg-red-400">
                                update
                            </p>{" "}
                            <p onClick={cancelEdit} className="cursor-pointer rounded p-1 ml-1 bg-green-300 hover:bg-green-400">
                                cancel
                            </p>
                        </>
                    ) : (
                        <PlusIcon
                            addTodo={() => {
                                addTodo(text, setTodo, setText, toast);
                            }}
                        />
                    )}
                </div>

                <div className="bg-transparent justify-between opacity-65 backdrop-blur-md border border-white  w-5/6 h-10 shadow-md  rounded mt-5 flex bg-white items-center">
                    <div className="flex p-3">
                        <ListIcon />
                        <p className="pl-2 text-black">Your todos</p>
                    </div>
                    <ChevronIcon />
                </div>
                <div className={"w-5/6  justify-center items-center shadow-md min-h-[200px] rounded-md bg-white mt-4 opacity-90 flex-col overflow-x-hidden overflow-y-auto " }>
                   {
                    load ? "loading..."  : todo.length ? (
                        todo.map((task, index) => {
                            return <TodoItem index={index} toast={toast} setTodo={setTodo} todo={todo} editTodo={editTodo} task={task} deleteTask={deleteTask} completeTask={completeTask} />;
                        })
                    ) : (
                        <p className="justify-center">No task today</p>
                    )}
                   
                </div>
            </div>
        </div>
    );
}
