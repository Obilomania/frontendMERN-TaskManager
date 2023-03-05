import React from "react";
import styled from "styled-components";

const TaskForm = ({
  createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask,
}) => {
  return (
    <Form>
      <form
        action=""
        className="task-form"
        onSubmit={isEditing ? updateTask : createTask}
      >
        <input
          type="text"
          placeholder="Add a task"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>
      </form>
    </Form>
  );
};

const Form = styled.div`
  input {
    width: 30rem;
    height: 2rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
  button {
    padding: 0.9rem;
    font-size: 1rem;
    background-color: red;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 400ms all ease-in;
    margin-left: 0.5rem;
  }
  button:hover {
    background: orangered;
    margin-left: 0.5rem;
  }
`;
export default TaskForm;
