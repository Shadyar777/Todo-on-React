import React, {useState} from 'react';

import './Form.scss';
import addSvg from '../../../assets/svgs/add.svg';
import axios from 'axios';

function AddTaskForm({list, onAddTask}) {
  const [visibilForm, setVisibilForm] = useState(true);
  const [inputValue, setinputValue] = useState('');

  const onVisibilForm = () => {
    setVisibilForm(!visibilForm);
  };
  const addTask = () => {
    if (!inputValue) {
      alert('Введите задачу');
      return;
    }
    let newTaskObj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    axios
      .post('http://localhost:3001/tasks', newTaskObj)
      .then(({data}) => {
        onAddTask(list.id, data);
      })
      .catch((error) => console.error(error))
      .finally(() => onVisibilForm());
  };

  return (
    <>
      {visibilForm ? (
        <div className='task__addfrom' onClick={() => onVisibilForm()}>
          <img src={addSvg} alt='vesibel form' />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className='task__form'>
          <input
            className='task__form-input field'
            type='text'
            placeholder='Текст задачи'
            value={inputValue}
            onChange={(e) => setinputValue(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />
          <button className='task__form-add button' onClick={() => addTask()}>
            Добавить задачу
          </button>
          <button className='task__form-cancellation' onClick={() => onVisibilForm()}>
            Отмена
          </button>
        </div>
      )}
    </>
  );
}

export default AddTaskForm;
