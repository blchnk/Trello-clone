import { v4 as uuidv4 } from 'uuid';
import * as types from '../../constants/actionTypes'
import getCurrentDate from '../../utils/getCurrentDate';

const initialState = {
    boards: []
}
const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_BOARD:
            return {
                ...state,
                boards: [
                    ...state.boards,
                    {
                        boardName: action.payload.boardName,
                        boardId: uuidv4(),
                        boardColumns: [
                            {
                                columnId: uuidv4(),
                                columnName: 'Queue',
                                columnTasks: []
                            },
                            {
                                columnId: uuidv4(),
                                columnName: 'Development',
                                columnTasks: []
                            },
                            {
                                columnId: uuidv4(),
                                columnName: 'Done',
                                columnTasks: []
                            },
                        ]
                    }]
            };
        case types.CREATE_NEW_TASK:
            return {
                ...state,
                boards: state.boards.map((board) => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map((column) => {
                                if (column.columnId === action.payload.columnId) {
                                    const columnTasks = column.columnTasks || [];
                                    return {
                                        ...column,
                                        columnTasks: [
                                            ...columnTasks,
                                            {
                                                taskName: action.payload.taskName,
                                                taskId: action.payload.taskId,
                                                columnId: action.payload.columnId,
                                                boardId: action.payload.boardId,
                                                taskDescription: '',
                                                taskPriority: '',
                                                taskCreationDate: getCurrentDate(),
                                                taskChecklist: []
                                            }
                                        ],
                                    };
                                }
                                return column;
                            }),
                        };
                    }
                    return board;
                }),
            }
        case types.DELETE_TASK:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    const newColumnTasks = [...column.columnTasks];
                                    const taskIndexForRemove = column.columnTasks.findIndex(task =>
                                        task.taskId === action.payload.taskId)
                                    newColumnTasks.splice(taskIndexForRemove, 1)

                                    return {
                                        ...column,
                                        columnTasks: newColumnTasks
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.EDIT_TASK_NAME:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskName: action.payload.taskName
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.ADD_TASK_DESCRIPTION:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskDescription: action.payload.taskDescription
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.ADD_TASK_PRIORITY:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskPriority: action.payload.taskPriority
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.ADD_TASK_CHECKLIST:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                const taskChecklist = task.taskChecklist || [];
                                                return {
                                                    ...task,
                                                    taskChecklist: [
                                                        ...taskChecklist,
                                                        {
                                                            boardId: action.payload.boardId,
                                                            columnId: action.payload.columnId,
                                                            taskId: action.payload.taskId,
                                                            checklistId: action.payload.checklistId,
                                                            checklistTitle: action.payload.checklistTitle,
                                                            checklistSubItems: [],
                                                        }
                                                    ]
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.ADD_TASK_CHECKLIST_SUB_ITEM:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskChecklist: task.taskChecklist.map(checklist => {
                                                        const checklistSubItems = checklist.checklistSubItems || [];
                                                        if (checklist.checklistId === action.payload.checklistId) {
                                                            return {
                                                                ...checklist,
                                                                checklistSubItems: [
                                                                    ...checklistSubItems,
                                                                    {
                                                                        name: action.payload.name,
                                                                        checked: action.payload.checked,
                                                                        checklistId: action.payload.checklistId,
                                                                        subItemId: uuidv4()
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                        return checklist;
                                                    })
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.UPDATE_STATUS_TASK_CHECKLIST_SUB_ITEM:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskChecklist: task.taskChecklist.map(checklist => {
                                                        if (checklist.checklistId === action.payload.checklistId) {
                                                            return {
                                                                ...checklist,
                                                                checklistSubItems: checklist.checklistSubItems.map(subItem => {
                                                                    if (subItem.subItemId === action.payload.subItemId) {
                                                                        return {
                                                                            ...subItem,
                                                                            checked: action.payload.checked
                                                                        }
                                                                    }
                                                                    return subItem
                                                                })
                                                            }
                                                        }
                                                        return checklist;
                                                    })
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.EDIT_TASK_CHECKLIST_NAME:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskChecklist: task.taskChecklist.map(checklist => {
                                                        if (checklist.checklistId === action.payload.checklistId) {
                                                            return {
                                                                ...checklist,
                                                                checklistTitle: action.payload.checklistTitle
                                                            }
                                                        }
                                                        return checklist;
                                                    })
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.DELETE_TASK_CHECKLIST_SUB_ITEM:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskChecklist: task.taskChecklist.map(checklist => {
                                                        if (checklist.checklistId === action.payload.checklistId) {
                                                            const newChecklistSubItems = [...checklist.checklistSubItems];
                                                            const subItemIndexForRemove = checklist.checklistSubItems.findIndex(item =>
                                                                item.subItemId === action.payload.subItemId
                                                            );
                                                            newChecklistSubItems.splice(subItemIndexForRemove, 1);

                                                            return {
                                                                ...checklist,
                                                                checklistSubItems: newChecklistSubItems
                                                            }
                                                        }
                                                        return checklist;
                                                    })
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.DELETE_CHECKLIST:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                const newTaskChecklist = [...task.taskChecklist];
                                                const checklistIndexForRemove = task.taskChecklist.findIndex(item =>
                                                    item.checklistId === action.payload.checklistId
                                                );
                                                newTaskChecklist.splice(checklistIndexForRemove, 1);

                                                return {
                                                    ...task,
                                                    taskChecklist: newTaskChecklist
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.EDIT_TASK_CHECKLIST_SUB_ITEM_NAME:
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return {
                                        ...column,
                                        columnTasks: column.columnTasks.map(task => {
                                            if (task.taskId === action.payload.taskId) {
                                                return {
                                                    ...task,
                                                    taskChecklist: task.taskChecklist.map(checklist => {
                                                        if (checklist.checklistId === action.payload.checklistId) {
                                                            return {
                                                                ...checklist,
                                                                checklistSubItems: checklist.checklistSubItems.map(subItem => {
                                                                    if (subItem.subItemId === action.payload.subItemId) {
                                                                        return {
                                                                            ...subItem,
                                                                            name: action.payload.name
                                                                        }
                                                                    }
                                                                    return subItem
                                                                })
                                                            }
                                                        }
                                                        return checklist;
                                                    })
                                                }
                                            }
                                            return task;
                                        })
                                    }
                                }
                                return column;
                            })
                        }
                    }
                    return board;
                })
            }
        case types.REORDER_COLUMN:
            const { newColumn } = action.payload;

            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.boardId === action.payload.boardId) {
                        return {
                            ...board,
                            boardColumns: board.boardColumns.map(column => {
                                if (column.columnId === action.payload.columnId) {
                                    return newColumn;
                                }
                                return column;
                            })
                        };
                    }
                    return board;
                })
            };
        case types.REORDER_BETWEEN_COLUMN:
            const { newStartColumn, newFinishColumn } = action.payload;

            const updatedBoards = state.boards.map(board => {
                if (board.boardId === action.payload.boardId) {
                    return {
                        ...board,
                        boardColumns: board.boardColumns.map(column => {
                            if (column.columnId === action.payload.startColumnId) {
                                return newStartColumn;
                            }

                            if (column.columnId === action.payload.finishColumnId) {
                                return newFinishColumn;
                            }

                            return column;
                        })
                    };
                }
                return board;
            })

            return {
                ...state,
                boards: updatedBoards
            }
        default:
            return state
    }
}

export default boardReducer;