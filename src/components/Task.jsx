import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";

const Task = ({ task, index, deleteTask, getSingleTask, setComplete }) => {
  return (
    <TheTask>
      <div>
        <div className={task.completed ? "taskCompleted" : "task"}>
          <div className="mainTask">
            <p>
              <b>{index + 1}. </b> {task.name}
            </p>
          </div>
          <div className="task-icons">
            <FaCheckDouble
              color="green"
              style={{ cursor: "pointer" }}
              onClick={() => setComplete(task)}
            />
            <FaEdit
              color="black"
              style={{ cursor: "pointer" }}
              onClick={() => {
                getSingleTask(task);
              }}
            />
            <FaRegTrashAlt
              style={{ cursor: "pointer" }}
              color="red"
              onClick={() => {
                deleteTask(task._id);
              }}
            />
          </div>
        </div>
      </div>
    </TheTask>
  );
};

const TheTask = styled.div`
  width: 100%;
  .task {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1.5rem;
    color: black;
    border-radius: 0.5rem;
    border-left: 0.5rem solid red;
    margin-top: 0.7rem;
  }
  .taskCompleted {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1.5rem;
    color: black;
    border-radius: 0.5rem;
    border-left: 0.5rem solid green;
    margin-top: 0.7rem;
  }
  .task-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;

export default Task;
