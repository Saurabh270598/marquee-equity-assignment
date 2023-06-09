import { useState } from "react";
import AddTaskComponent from "./addTask";
import { v1 } from "uuid";
import "./style.css";
import MainComponent from "./subtask";
const ToDoCOmponent = () => {
  const [todoText, setTodotext] = useState<string>("");
  const [todoTextAdded, setTodotextAdded] = useState<{
    [key: string]: {
      value: string;
      subTask?: {
        [key: string]: string | { value: string };
      };
    };
  }>({});

  const handleAddTask = () => {
    if (todoText.trim().length) {
      setTodotextAdded({
        ...todoTextAdded,
        [v1()]: {
          value: todoText,
        },
      });
    }
    setTodotext("");
  };

  const handleAddSubtask = (parentTaskKey: string, value: string) => {
    const newSubTaskKey = v1();
    const newSubTask = { value: value };
    const updatedParentTask = {
      ...todoTextAdded[parentTaskKey],
      subTask: {
        ...todoTextAdded[parentTaskKey].subTask,
        [newSubTaskKey]: newSubTask,
      },
    };

    setTodotextAdded({
      ...todoTextAdded,
      [parentTaskKey]: updatedParentTask,
    });
  };

  return (
    <div className="my-todo-wrapper">
      <div className="my-todo-text">My Todo</div>
      <div className="my-todo-container">
        {todoTextAdded ? (
          <div>
            {Object.keys(todoTextAdded).map((parentTaskKey) => {
              const parentTask = todoTextAdded[parentTaskKey];
              return (
                <MainComponent
                  todoText={todoText}
                  setTodotext={setTodotext}
                  handleAddTask={handleAddTask}
                  handleAddSubtask={(_, value: string) =>
                    handleAddSubtask(parentTaskKey, value)
                  }
                  isSubInputOpen={true}
                  value={parentTask.value}
                  subtaskValue={parentTask.subTask || {}}
                />
              );
            })}
          </div>
        ) : null}
        <AddTaskComponent
          todoText={todoText}
          setTodotext={setTodotext}
          handleAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};
export default ToDoCOmponent;
