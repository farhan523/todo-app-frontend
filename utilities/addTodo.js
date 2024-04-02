const url = require("@/baseUrl");
export default async function addTodo(text, setTodo, setText, toast) {
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

