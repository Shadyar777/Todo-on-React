import React from 'react';
import {Link} from 'react-router-dom';

import editSvg from '../../assets/svgs/edit.svg';
import checkSvg from '../../assets/svgs/check.svg';
import removeSvg from '../../assets/svgs/remove.svg';


import './Tasks.scss';
import AddTaskForm from './Form/AddTaskForm';
import Task from './Task/Task'

function Tasks({list, editTitle, editTask, removeTask, onAddTask, onCompleteCheckBox}) {
  return (
    <div className='task'>
      <h2 className='task__title'>
        <Link style = {{color : list.color.hex}} to={`/lists/${list.id}`}>{list && list.name}</Link>
        <img onClick={() => editTitle(list)} src={editSvg} alt='Edit task' />
      </h2>
      <div className='task__items'>
        {list &&
          list.tasks.map((item, index) => (
            <Task 
            key = {index}
            item = {item} 
            editTask = {editTask} 
            removeTask = {removeTask}
            editSvg = {editSvg}
            checkSvg = {checkSvg}
            removeSvg = {removeSvg}
            onCompleteCheckBox = {onCompleteCheckBox}
            />
          ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}

export default Tasks;
