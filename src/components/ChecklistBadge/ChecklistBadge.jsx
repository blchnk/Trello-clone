import React, { useEffect, useState } from 'react';
import style from './ChecklistBadge.module.scss';
import cx from 'classnames';
import { ReactComponent as ChecklistBadgeIcon } from '../../assets/checklistBadge.svg';
import { ReactComponent as ChecklistBadgeDarkIcon } from '../../assets/checklistBadgeDark.svg';

export default function ChecklistBadge({ task }) {
  const [subtaskCounter, setSubtaskCounter] = useState(0);
  const [checkedSubtaskCounter, setCheckedSubtaskCounter] = useState(0);

  const countTotalSubtasks = () => {
    let totalSubtasks = 0;
    let totalCheckedSubtasks = 0;
    if (task.taskChecklist) {
      task.taskChecklist.forEach((checklist) => {
        if (checklist.checklistSubItems) {
          totalSubtasks += checklist.checklistSubItems.length;
          totalCheckedSubtasks += checklist.checklistSubItems.filter(subtask => subtask.checked).length;
        }
      });
    }
    setSubtaskCounter(totalSubtasks);
    setCheckedSubtaskCounter(totalCheckedSubtasks);
  };

  useEffect(() => {
    countTotalSubtasks();
  }, [task]);

  return subtaskCounter !== 0 ? (
    <span className={cx(style.checklistBadgesBody, (checkedSubtaskCounter === subtaskCounter) && style.completed)}>
      {checkedSubtaskCounter === subtaskCounter ? (
        <ChecklistBadgeDarkIcon />
      ) : (
        <ChecklistBadgeIcon />
      )}
      <span className={style.checklistsCount}>
        {checkedSubtaskCounter}/{subtaskCounter}
      </span>
    </span>
  ) : null;
}
