const url = require("../baseUrl");

export default async function completeTask(id, index, todo, setTodo, toast) {
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

