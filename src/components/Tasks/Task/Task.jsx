import classNames from 'classnames';
import React from 'react';
function Task({item, editTask, removeTask, onCompleteCheckBox, editSvg, checkSvg, removeSvg}) {
  const completeCheckBox = (e) => {
    onCompleteCheckBox(item.id, item.listId, e.target.checked);
  }  
  return (
    <div key={item.id} className='task__rows'>
      <div className='task__checkbox'>
        <input id={item.id} onChange = {completeCheckBox} type='checkbox' checked={item.completed} />
        <label htmlFor={item.id}>
          <img src={checkSvg} alt='check img' />
        </label>
      </div>
      <div className='task__text'>
        <p className = {classNames({completed : item.completed} )}>{item.text}</p>
        <div className='task__text-handle'>
          <img className='task__text-edit' src={editSvg} onClick={() => editTask(item)} alt='edit' />
          <img className='task__text-remove' src={removeSvg} onClick={() => removeTask(item.id)} alt='remove' />
        </div>
      </div>
    </div>
  );
}

export default Task;
