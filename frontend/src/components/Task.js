import React, { useEffect, useRef, useState } from 'react'
import './Task.css'

const Task = () => {
    const [tasklist, setTasklist] = useState([]);
    const taskname = useRef();

    useEffect(() => {
        console.log(tasklist);
    }, [tasklist]);

    //Setting style
    const style = {
        visibility: "hidden",
        opacity: "0",
        transition: "all .1s ease-in-out",
        overflow: "hidden",
    }

    // Handle close and open toggle Task Setting menu
    const handleCloseAndOpen = () => {
        const opacity = document.getElementById("task-setting-outer").style.opacity;
        if (opacity === "1"){
            document.getElementById("task-setting-outer").style.visibility = "hidden";
            document.getElementById("task-setting-outer").style.opacity = "0";
        }
        else {
            document.getElementById("task-setting-outer").style.visibility = "visible";
            document.getElementById("task-setting-outer").style.opacity = "1";
        }
    }

    const handleAddTask = () => {
        var newTask = {
            name: taskname.current.value,
            isDone: false,
        }
        taskname.current.value = "";
        setTasklist(tasklist => [...tasklist, newTask]);
        handleCloseAndOpen();
    }

    return (
        <div>
            <div id="task-container">
                <div id="task-header">Task</div>
                {tasklist.map((task, index) => (
                    <div className="task" key={index}>
                        <div className="task-checkbox-round">
                            <input type="checkbox" name="checkbox" id={`task-checkbox-${index}`} className='task-checkbox' defaultChecked={task.isDone}/>
                            <label className="task-checkbox-custom" for={`task-checkbox-${index}`} onClick={() => {
                                let temp = tasklist.map((Task, Index) => {
                                    if (Index === index) {
                                        return {
                                            name: Task.name,
                                            isDone: (!Task.isDone),
                                        }
                                    }
                                    else {
                                        return Task;
                                    }
                                })
                                setTasklist(temp);
                            }}></label>
                        </div>
                        {task.name}
                    </div>
                ))
                }
                <div id="task-btn" onClick={() => handleCloseAndOpen()}>
                    <svg stroke={"white"} xmlns="http://www.w3.org/2000/svg" width="28" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16" style={{transform: "translateY(2.5px)"}}>
                        <path strokeWidth={1.5} fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </div>
            </div>
            <div id="task-setting-outer" style={style}>
                    <div id="task-setting-container">
                        <div className="task-setting-header">
                            <h1 className='task-setting-title'>Add Task</h1> 
                            <svg className='bi bi-x setting-close-icon' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={() => handleCloseAndOpen()}>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <input ref={taskname} id="task-setting-input" type="text" placeholder='Task Name'/>
                        <input id='task-setting-btn' type="button" value="Add task" onClick={() => handleAddTask()}/>
                    </div>
                </div>
        </div>
    )
}

export default Task