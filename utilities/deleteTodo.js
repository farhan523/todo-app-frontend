const url = require("../baseUrl");

export default async function deleteTask(id, todo, setTodo, toast) {
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

