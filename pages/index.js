import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import PlusIcon from "@/public/icons/PlusIcon";
import ListIcon from "@/public/icons/ListIcon";
import ChevronIcon from "@/public/icons/ChevronIcon";
import { toast } from "react-toastify";

// import addTodo from "../utilities/addTodo";
// import deleteTask from "../utilities/deleteTodo";
// import completeTask from "../utilities/completeTask";
// import updateTodo from "../utilities/updateTodo";
// import getAllTodo from "../utilities/getAllTodo";

import TodoItem from "@/components/TodoItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [todo, setTodo] = useState([]);
    const [text, setText] = useState("");
    const [load, setLoad] = useState(true);
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

   async function addTodo(text= "", setTodo = "", setText = "", toast = "") {
        if (text.length < 3) return toast.info("task length must be at least 3");
        try {
            let headersList = {
                Accept: "*/*",
                "Content-Type": "application/json"
            };
    
            let bodyContent = JSON.stringify({
                title: text,
                completed: false
            });
            console.log(`${url}api/task/addTask/`);
            let response = await fetch(`${url}api/task/addTask/`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
    
            if (response.ok) {
                let data = await response.json();
                setTodo((prev) => {
                    return [...prev, data.newTask];
                });
                setText("");
                toast.success("task added to list");
            } else {
                toast.error("error try again");
            }
        } catch (e) {
            console.log(e);
            toast.error("Error try again");
        }
    }
    
    async function completeTask(id, index, todo, setTodo, toast) {
        try {
            let headersList = {
                Accept: "*/*",
                "Content-Type": "application/json"
            };
    
            let bodyContent = JSON.stringify({
                completed: true
            });
    
            console.log(bodyContent);
            let response = await fetch(`${url}api/task/update/${id}`, {
                method: "PATCH",
                body: bodyContent,
                headers: headersList
            });
    
            if (response.ok) {
                console.log(todo, index, todo[index]);
                let updatedTodo = Array.from(todo);
                updatedTodo[index] = updatedTodo[index] ? { ...updatedTodo[index], completed: true } : { ...updatedTodo[index] };
                console.log(updatedTodo);
                setTodo(updatedTodo);
                toast.success("successfully completed task");
            } else {
                toast.error("Error try again");
            }
        } catch (e) {
            console.log(e);
            toast.error("Error try again");
        }
    }

    async function deleteTask(id, todo, setTodo, toast) {
        try {
            let response = await fetch(`${url}api/task/remove/${id}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                let updatedTask = todo.filter((obj) => obj._id !== id);
                setTodo(updatedTask);
                console.log(updatedTask);
    
                toast.success("successfully deleted task");
            } else {
                toast.error("Error try again");
            }
        } catch (e) {
            toast.error("Error try again");
        }
    }
    
    async function getAllTodo(setTodo, toast,setLoad) {
        setLoad(true);
        try {
            let response = await fetch(`${url}api/task/`, {
                method: "GET"
            });
    
            if (response.ok) {
                let data = await response.json();
                setTodo(data);
            } else {
                toast.error("Error while fetching..");
            }
            
        } catch (e) {
            toast.error("Error while fetching..");
        }finally{
            setLoad(false);
        }
    }
    
   async function updateTodo(todo, setTodo, setText, toast, text, edit, setEdit) {
        try {
            if (text.length < 3) return toast.info("task length must be at least 3");
    
            let headersList = {
                Accept: "*/*",
                "Content-Type": "application/json"
            };
    
            let bodyContent = JSON.stringify({
                title: text
            });
    
            console.log(bodyContent);
            let response = await fetch(`${url}api/task/update/${edit.id}`, {
                method: "PATCH",
                body: bodyContent,
                headers: headersList
            });
    
            if (response.ok) {
                console.log(todo, edit.index, todo[edit.index]);
                let updatedTodo = Array.from(todo);
                updatedTodo[edit.index] = updatedTodo[edit.index] ? { ...updatedTodo[edit.index], title: text } : { ...updatedTodo[edit.index] };
                console.log(updatedTodo);
                setTodo(updatedTodo);
                toast.success("successfully updated task");
                setText("");
                setEdit({ set: false, id: null, index: null });
            } else {
                toast.error("Error try again");
            }
        } catch (e) {
            console.log(e);
            toast.error("Error try again");
        }
    }
        
    

    

    useEffect(() => {
        getAllTodo(setTodo, toast, setLoad);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen  shadow-inner  bg-[url('../public/images/image.png')]  bg-cover bg-center backdrop-blur   bg-no-repeat">
            <div className="w-10   flex flex-col items-center" style={{ width: 400, height: 500 }}>
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
                <div className={"w-5/6  justify-center items-center shadow-md min-h-[200px] rounded-md bg-white mt-4 opacity-90 flex-col overflow-x-hidden overflow-y-auto "}>
                    {load ? (
                        <p>Loading...</p>
                    ) : todo.length ? (
                        todo.map((task, index) => {
                            return <TodoItem key={task._id} index={index} toast={toast} setTodo={setTodo} todo={todo} editTodo={editTodo} task={task} deleteTask={deleteTask} completeTask={completeTask} />;
                        })
                    ) : (
                        <p>No task today</p>
                    )}
                </div>
            </div>
        </div>
    );
}
