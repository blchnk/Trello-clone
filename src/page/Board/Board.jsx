import { useParams } from "react-router-dom";
import Column from "./Components/Column/Column";
import style from "./Board.module.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  reorderColumn,
  reorderBetweenColumn,
} from "../../actions/boardActions";
import { useEffect } from "react";

export default function Board() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardReducer.boards);
  const { boardId } = useParams();

  // useEffect(() => {
  //   console.log('board is rendered');
  // }, [])

  const shownBoards = boards.find((board) => {
    return board.boardId === boardId;
  });

  const boardColumns = shownBoards?.boardColumns;

  const reorderColumnHandler = (newColumn, columnId) => {
    dispatch(
      reorderColumn({
        boardId: shownBoards?.boardId,
        newColumn,
        columnId,
      })
    );
  };

  const reorderBetweenColumnHandler = (
    startId,
    finishId,
    newColumnStart,
    newColumnFinish
  ) => {
    dispatch(
      reorderBetweenColumn({
        boardId: shownBoards?.boardId,
        startColumnId: startId,
        finishColumnId: finishId,
        newStartColumn: newColumnStart,
        newFinishColumn: newColumnFinish,
      })
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = boardColumns?.find(
      (column) => column.columnId === source.droppableId
    );

    const endColumn = boardColumns?.find(
      (column) => column.columnId === destination.droppableId
    );

    // if dropped in the same Column
    if (startColumn === endColumn) {
      if (startColumn) {
        const newTaskIds = Array.from(startColumn?.columnTasks);

        const itemToReorder = newTaskIds.find(
          (item) => item.taskId === draggableId
        );

        newTaskIds.splice(source.index, 1);

        if (itemToReorder) {
          newTaskIds.splice(destination.index, 0, itemToReorder);
        }

        const newColumn = {
          ...startColumn,
          columnTasks: newTaskIds,
        };

        reorderColumnHandler(newColumn, source.droppableId);
        return;
      }
    }

    // if dropped in the other Column
    if (startColumn && endColumn) {
      const startTaskIds = Array.from(startColumn?.columnTasks);

      const itemToReArange = startTaskIds.find(
        (item) => item.taskId === draggableId
      );

      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        columnTasks: startTaskIds,
      };

      const finishTaskIds = Array.from(endColumn?.columnTasks);

      if (itemToReArange) {
        finishTaskIds.splice(destination.index, 0, itemToReArange);
      }

      const newFinishColumn = {
        ...endColumn,
        columnTasks: finishTaskIds,
      };

      reorderBetweenColumnHandler(
        source.droppableId,
        destination.droppableId,
        newStartColumn,
        newFinishColumn
      );
    }
  };

  return (
    <div className="container">
      <h1 className={style.workspaceName}>{shownBoards.boardName}</h1>
      <div className={style.cardsWrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
          {boardColumns?.map((item, key) => (
            <Column
              key={key}
              boardId={boardId}
              columnItem={item} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
