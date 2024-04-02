const url = require("../baseUrl");

export default async function updateTodo(todo, setTodo, setText, toast, text, edit, setEdit) {
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

