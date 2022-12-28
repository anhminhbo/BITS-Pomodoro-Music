import React, { useEffect, useRef, useState } from "react";
import "./Task.css";
import axios from "axios";

const Task = () => {
  const [tasklist, setTasklist] = useState([]);
  const taskname = useRef();

  //   Get tasks
  const getTasks = async () => {
    try {
      const response = await axios.get(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/task/getTasks`
      );
      const tasks = response.data.data.tasks;
      setTasklist(tasks);
    } 
    catch (err) {
        if (err.response.data.errCode === 112) {
          // Handle when session expired
          alert("ERROR: Session expired!");
          window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
        }
    }
  };

  //   Update tasks
  const updateTasks = async (index, name, isDone) => {
    try {
      const payload = {
        task: {
          index,
          name,
          isDone,
        },
      };
      const response = await axios.put(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/task/updateTask`,
        payload
      );

      // Handle update tasks -> Update tasks on UI
      console.log("Handle update tasks");
      await getTasks();

      return response;
    } catch (err) {
      if (err.response.data.errCode === 112) {
        // Handle when session expired
        console.log("Handle when session expired");
      } else if (err.response.data.errCode === 119) {
        // Handle when task name empty
        console.log("Handle when task name empty");
      }

      console.log(err.response.data);
    }
  };

  const deleteTask = async (index) => {
    try {
      const response = await axios.delete(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/task/deleteTask/${index}`
      );
      await getTasks();
    } catch (err) {
      if (err.response.data.errCode === 112) {
        // Handle when session expired
        console.log("Handle when session expired");
      } else if (err.response.data.errCode === 120) {
        // Handle when task index empty
        console.log("Handle when task index empty");
      } else if (err.response.data.errCode === 121) {
        // Handle when task index not existed
        console.log("Handle when task index not existed");
      }

      console.log(err.response.data);
    }
  };

  //   First time login
  useEffect(() => {
    getTasks();
  }, []);

  //Setting style
  const style = {
    visibility: "hidden",
    opacity: "0",
    transition: "all .1s ease-in-out",
    overflow: "hidden",
  };

  // Handle close and open toggle Task Setting menu
  const handleCloseAndOpen = () => {
    const opacity = document.getElementById("task-setting-outer").style.opacity;
    if (opacity === "1") {
      document.getElementById("task-setting-outer").style.visibility = "hidden";
      document.getElementById("task-setting-outer").style.opacity = "0";
    } 
    else {
      document.getElementById("task-setting-outer").style.visibility ="visible";
      document.getElementById("task-setting-outer").style.opacity = "1";
    }
  };

  const handleAddTask = () => {
    updateTasks(tasklist.length, taskname.current.value, false);
    handleCloseAndOpen();
    taskname.current.value = "";
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  return (
    <div>
      <div id="task-container">
        <div id="task-header">Task</div>
        {tasklist.map((task, index) => (
          <div className={`task` + (task.isDone ? "-done" : "")} key={index}>
            <div className="task-info">
              <div className="task-checkbox-round">
                <input
                  type="checkbox"
                  name="checkbox"
                  id={`task-checkbox-${index}`}
                  className="task-checkbox"
                  defaultChecked={task.isDone}
                />
                <label
                  className="task-checkbox-custom"
                  for={`task-checkbox-${index}`}
                  onClick={() => {
                    const temp = tasklist.map((Task, Index) => {
                      if (Index === index) {
                        return {
                          name: Task.name,
                          isDone: !Task.isDone,
                        };
                      } else {
                        return Task;
                      }
                    });
                    setTasklist(temp);
                  }}
                ></label>
              </div>
              <div
                className="task-name"
                style={{
                  textDecoration: task.isDone ? "line-through" : "none",
                }}
              >
                {task.name}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
              className="task-close-btn"
              onClick={() => handleDeleteTask(index)}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        ))}
        <div id="task-btn" onClick={() => handleCloseAndOpen()}>
          <svg
            stroke={"white"}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="25"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
            style={{ transform: "translateY(2.5px)" }}
          >
            <path
              strokeWidth={1.5}
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </div>
      </div>
      <div
        id="task-setting-outer"
        style={style}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
      >
        <div id="task-setting-container">
          <div className="task-setting-header">
            <h1 className="task-setting-title">Add Task</h1>
            <svg
              className="bi bi-x setting-close-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={() => handleCloseAndOpen()}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
          <input
            ref={taskname}
            id="task-setting-input"
            type="text"
            placeholder="Task Name"
          />
          <input
            id="task-setting-btn"
            type="button"
            value="Add task"
            onClick={() => handleAddTask()}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
