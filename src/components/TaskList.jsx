import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import styled from "styled-components";
import BG from "../assets/BG.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import Loading from "./Loading";

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  //Retreive data from the form
  const { name } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Function to get Tasks
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTask(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  //Function to Post task to the database
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Function to delete task from the database
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Function to get a single task from the database
  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty...");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Function to set Completed
  const setComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      toast.success("Task has been Completed");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Get the number of completed task
  useEffect(() => {
    const compTask = task.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(compTask);
  }, [task]);

  return (
    <TaskHome>
      <div className="taskContainer">
        <div className="taskManager">
          <h1>Task Manager</h1>
          <TaskForm
            name={name}
            handleInputChange={handleInputChange}
            createTask={createTask}
            isEditing={isEditing}
            updateTask={updateTask}
          />
          <div className={task.length === 0 ? "toDoInvinsible" : "toDO"}>
            <p>
              <b>Total Tasks :</b> {task.length}
            </p>
            <p>
              <b>Completed Tasks :</b> {completedTasks.length}
            </p>
          </div>
          <hr />
          <br />

          {isLoading && <Loading />}
          {!isLoading && task.length === 0 ? (
            <p>No Task Found ... Add a Task!!!</p>
          ) : (
            <>
              {task.map((task, index) => {
                return (
                  <Task
                    key={task._id}
                    task={task}
                    index={index}
                    deleteTask={deleteTask}
                    getSingleTask={getSingleTask}
                    setComplete={setComplete}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="background">
        <div className="overlay"></div>
        <img src={BG} alt="" />
      </div>
    </TaskHome>
  );
};

const TaskHome = styled.div`
  width: 100%;
  min-height: fit-content;
  position: relative;
  top: 5rem;
  .taskContainer {
    position: absolute;
    left: 50%;
    top: 8%;
    transform: translate(-50%, -8%);
    z-index: 10;
  }
  .taskManager {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
    color: white;
    h1 {
      font-weight: 400;
      margin-bottom: 0.7rem;
    }
  }
  .toDoInvinsible {
    display: none;
  }
  .toDO {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 1rem 0 0 0;
    p {
      color: red;
    }
    b {
      color: white;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 1;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.9);
    }
    img {
      width: 100%;
      height: 100vh;
    }
  }
`;
export default TaskList;
