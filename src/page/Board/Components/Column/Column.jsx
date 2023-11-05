import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import useClickOutside from "../../../../hooks/useClickOutside";
import AddTaskForm from "./Task/AddTaskForm/AddTaskForm";
import useToggle from "../../../../hooks/useToggle";
import Task from "./Task/Task";
import style from "./Column.module.scss";

export default function Column({ columnItem, boardId }) {
  const [taskAdding, setTaskAdding] = useToggle(false);
  const addTaskRef = useRef(null);
  useClickOutside(addTaskRef, () => setTaskAdding());

  return (
    <div className={style.card}>
      <h2 className={style.cardName}>{columnItem.columnName}</h2>

      <Droppable droppableId={columnItem.columnId}>
        {(provided) => (
          <ul
            className={style.taskList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnItem.columnTasks?.map((task, index) => (
              <Task
                key={task.taskId}
                index={index}
                taskItem={task}
                boardId={boardId}
                columnId={columnItem.columnId}
              />
            ))}
            <li
              style={{ width: "1px", height: "1px" }}
              className="droppable_ID_adder"
            ></li>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {taskAdding ? (
        <AddTaskForm
          boardId={boardId}
          columnId={columnItem.columnId}
          forwardRef={addTaskRef}
          setTaskAdding={setTaskAdding}
        />
      ) : (
        <div className={style.addTask} onClick={setTaskAdding}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M466-466H252v-28h214v-214h28v214h214v28H494v214h-28v-214"
              fill="white"
            />
          </svg>
          <span className={style.addTaskText}>Add task</span>
        </div>
      )}
    </div>
  );
}

Column.propTypes = {
  columnItem: PropTypes.object,
  boardId: PropTypes.string,
};
