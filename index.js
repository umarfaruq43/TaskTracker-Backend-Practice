#!/usr/bin/env node

const fs = require("fs")
const itemData = {
    id: null,
    description: null,
    status: "todo", // can be  (todo, in-progress or done)
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

const filePath = "./task.json"

const isFileExisting = fs.existsSync(filePath)
// list task 
const listTask = (taskType) => {

    if (isFileExisting) {
        fs.readFile("task.json", (err, data) => {
            const books = JSON.parse(data)
            const done = books?.filter((item) => item?.status === "done")
            const todo = books?.filter((item) => item?.status === "todo")
            const inProgress = books?.filter((item) => item?.status === "in-progress")

            if (taskType === "done") {
                console.log(done);
                return
            } else if (taskType === "todo") {
                console.log(todo);
                return
            } else if (taskType === "in-progress") {
                console.log(inProgress);
                return
            } else {
                console.log(books);

            }
        })
    } else {
        console.log("File not found");

    }
}

const createTask = (newData) => {
    if (newData) {
        if (isFileExisting) {
            try {
                fs.readFile("task.json", "utf8", (err, data) => {
                    const tasks = JSON.parse(data)
                    const isDuplicate = tasks.find((item) => item?.description === newData)
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (isDuplicate) {
                        console.log("Tasks Already Exist");
                        return;
                    }
                    const newTask = [...tasks, { ...itemData, id: tasks.length + 1, description: newData }]

                    fs.writeFile("task.json", JSON.stringify(newTask, null, 2), "utf8", (err) => {
                        if (err) {
                            console.log(err);
                            return
                        }
                        console.log('Added file successfully');
                    })
                })
            } catch (error) {
                console.log("An error as occurred,", error);
            }
        } else {

            const formatData = [{ ...itemData, id: 1, description: newData }]
            fs.writeFile("task.json", JSON.stringify(formatData, null, 2), "utf8", (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('Added file successfully');
            })
            // console.log(formatData);


        }

    } else {
        console.log("No Data passed")
    }

}
// createTask("Faruq is a Man")

const updateTask = (id, passedData) => {
    const passedId = id ? Number.parseInt(id) : id;

    if (passedData) {
        try {
            fs.readFile("task.json", "utf8", (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }

                const tasks = JSON.parse(data)

                const taskExist = tasks.some((item) => item?.id === passedId)
                if (!taskExist) {
                    console.log("NO DATA WITH THE ID IS FOUND");

                    return;
                }

                const updatedData = tasks?.map((item) => item?.id === passedId ? { ...item, description: passedData, updatedAt: new Date()?.toISOString() } : item)

                fs.writeFile("task.json", JSON.stringify(updatedData, null, 2), "utf8", (err) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log('Updated file successfully');
                })
            })




        } catch (error) {
            console.log("An error as occurred,", error);

        }
    } else {
        console.log("no Data Provided");

    }

}
// updateTask(1, "This is the first data.")

const deleteTask = (id) => {
    const passedId = id ? Number.parseInt(id) : id;
    if (id) {
        try {
            fs.readFile("task.json", "utf8", (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }

                const tasks = JSON.parse(data)

                const taskExist = tasks.some((item) => item?.id === passedId)
                if (!taskExist) {
                    console.log("NO DATA WITH THE ID IS FOUND");

                    return;
                }

                const updatedData = tasks?.filter((item) => item?.id !== passedId)

                fs.writeFile("task.json", JSON.stringify(updatedData, null, 2), "utf8", (err) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log('Delete file successfully');
                })
            })




        } catch (error) {
            console.log("An error as occurred,", error);

        }
    } else {
        console.log("no Data Provided");

    }
}
// deleteTask(2)


const markUpdate = (passedData, id) => {
    if (passedData && id) {
        try {
            fs.readFile("task.json", "utf8", (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }

                const tasks = JSON.parse(data)

                const taskExist = tasks.some((item) => item?.id === id)
                if (!taskExist) {
                    console.log("NO DATA WITH THE ID IS FOUND");

                    return;
                }

                if (passedData === "mark-in-progress") {

                    const updatedData = tasks?.map((item) => item?.id === id ? { ...item, status: "in-progress", updatedAt: new Date()?.toISOString() } : item)

                    fs.writeFile("task.json", JSON.stringify(updatedData, null, 2), "utf8", (err) => {
                        if (err) {
                            console.log(err);
                            return
                        }
                        console.log('Updated file successfully');
                    })
                }
                if (passedData === "mark-done") {

                    const updatedData = tasks?.map((item) => item?.id === id ? { ...item, status: "done", updatedAt: new Date()?.toISOString() } : item)

                    fs.writeFile("task.json", JSON.stringify(updatedData, null, 2), "utf8", (err) => {
                        if (err) {
                            console.log(err);
                            return
                        }
                        console.log('Updated file successfully');
                    })
                }

            })




        } catch (error) {
            console.log("An error as occurred,", error);

        }
    } else {
        console.log("no Data Provided");

    }

}

// markUpdate("mark-in-progress", 1)

const args = process.argv.slice(2)
const command = args[0]
const arg1 = args[1];
const arg2 = args[2];

switch (command) {
    case 'add':
        createTask(arg1);
        break;
    case 'update':
        updateTask(arg1, arg2);
        break;
    case 'delete':
        deleteTask(arg1);
        break;
    case 'mark-in-progress':
        markUpdate(arg1);
        break;
    case 'mark-done':
        markUpdate(arg1);
        break;
    case 'list':
        listTask(arg1);
        break;
    default:
        console.log("Unknown Command");

}