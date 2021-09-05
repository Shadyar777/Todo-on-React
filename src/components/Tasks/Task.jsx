import React from 'react';
import {Link} from 'react-router-dom';

import editSvg from '../../assets/svgs/edit.svg';
import checkSvg from '../../assets/svgs/check.svg';
import removeSvg from '../../assets/svgs/remove.svg';

import './Task.scss';
import AddTaskForm from './Form/AddTaskForm';

function Task({list, editTitle, editTask, removeTask, onAddTask}) {
  return (
    <div className='task'>
      <h2 className='task__title'>
        <Link style = {{color : list.color.hex}} to={`/lists/${list.id}`}>{list && list.name}</Link>
        <img onClick={() => editTitle(list)} src={editSvg} alt='Edit task' />
      </h2>
      <div className='task__items'>
        {list &&
          list.tasks.map((item) => (
            <div key={item.id} className='task__rows'>
              <div className='task__checkbox'>
                <input id={item.id} type='checkbox' />
                <label htmlFor={item.id}>
                  <img src={checkSvg} alt='' />
                </label>
              </div>
              <div className='task__text'>
                <p>{item.text}</p>
                <div className='task__text-handle'>
                  <img className='task__text-edit' src={editSvg} onClick={() => editTask(item)} alt='edit' />
                  <img className='task__text-remove' src={removeSvg} onClick={() => removeTask(item.id)} alt='remove' />
                </div>
              </div>
            </div>
          ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
      {/* {list && list.tasks.map((item) => <h3 className='task__text'>{item.text}</h3>)} */}
    </div>
  );
}

export default Task;
