import * as types from '../constants/actionTypes'

function addBoard(payload) {
    return {
        type: types.CREATE_NEW_BOARD,
        payload: payload
    }
}

function addTask(payload) {
    return {
        type: types.CREATE_NEW_TASK,
        payload: payload
    }
}

function deleteTask(payload) {
    return {
        type: types.DELETE_TASK,
        payload: payload
    }
}

function editTaskName(payload) {
    return {
        type: types.EDIT_TASK_NAME,
        payload: payload
    }
}

function addTaskDescription(payload) {
    return {
        type: types.ADD_TASK_DESCRIPTION,
        payload: payload
    }
}

function addTaskPriority(payload) {
    return {
        type: types.ADD_TASK_PRIORITY,
        payload: payload
    }
}

function addChecklist(payload) {
    return {
        type: types.ADD_TASK_CHECKLIST,
        payload: payload
    }
}
function editChecklistName(payload) {
    return {
        type: types.EDIT_TASK_CHECKLIST_NAME,
        payload: payload
    }
}

function addChecklistSubItem(payload) {
    return {
        type: types.ADD_TASK_CHECKLIST_SUB_ITEM,
        payload: payload
    }
}

function updateStatusChecklistSubItem(payload) {
    return {
        type: types.UPDATE_STATUS_TASK_CHECKLIST_SUB_ITEM,
        payload: payload
    }
}

function deleteChecklistSubItem(payload) {
    return {
        type: types.DELETE_TASK_CHECKLIST_SUB_ITEM,
        payload: payload
    }
}

function editChecklistSubItemName(payload) {
    return {
        type: types.EDIT_TASK_CHECKLIST_SUB_ITEM_NAME,
        payload: payload
    }
}

function deleteChecklist(payload) {
    return {
        type: types.DELETE_CHECKLIST,
        payload: payload
    }
}

function reorderColumn(payload) {
    return {
        type: types.REORDER_COLUMN,
        payload: payload
    }
}

function reorderBetweenColumn(payload) {
    return {
        type: types.REORDER_BETWEEN_COLUMN,
        payload: payload
    }
}

export {
    addBoard,
    addTask,
    deleteTask,
    editTaskName,
    addTaskDescription,
    addChecklist,
    editChecklistName,
    addChecklistSubItem,
    updateStatusChecklistSubItem,
    deleteChecklistSubItem,
    deleteChecklist,
    editChecklistSubItemName,
    addTaskPriority,
    reorderColumn,
    reorderBetweenColumn,
}