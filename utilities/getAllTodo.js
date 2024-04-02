import url from "../baseUrl";

export default async function getAllTodo(setTodo, toast,setLoad) {
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


