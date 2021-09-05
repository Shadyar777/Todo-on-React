import React, {useEffect, useState} from 'react';
import Badge from '../Badge/Badge';
import axios from 'axios';

import List from '../Lists/List';
import './AddList.scss';
import closeSvg from '../../assets/svgs/close.svg';

function AddList({colors, onAdd}) {
  const [inputValue, setInputValue] = useState('');
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectColor, setSelectColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const onChangeValue = (e) => {
    setInputValue(e.currentTarget.value);
  };
  const closePopup = () => {
    setVisiblePopup(!visiblePopup);
    setInputValue("");
    setSelectColor(colors[0].id);
  };
  useEffect(() => {
    if (Array.isArray(colors)) setSelectColor(colors[0].id);
  }, [colors]);

  const addForm = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    let newList = {
      name: inputValue,
      colorId: selectColor,
    };
    setIsLoading(false);
    axios
      .post('http://localhost:3001/lists', newList)
      .then(({data}) => {
        let color = colors.filter((item) => item.id === selectColor)[0];
        let newObj = {...data, color, tasks: []};
        onAdd(newObj);
        closePopup();
      })
      .catch((error) => console.error(error))
      .finally(() => {setIsLoading(true)});
  };

  return (
    <div className='add-list'>
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            icon: (
              <svg className='listSvg' width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8 1V15' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M1 8H15' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            ),
            name: 'Добавить папку',
            addClassName: 'list__add-button',
          },
        ]}
      />
      {visiblePopup && (
        <div className='add-list__popup'>
          <img onClick={closePopup} className='add-list__popup-close' src={closeSvg} alt='' />
          <input onKeyDown = {(e) => {if(e.key === "Enter") addForm()}} onChange={onChangeValue} value={inputValue} className='add-list__popup-indents field' type='text' placeholder='Название списка' />
          <div className='add-list__popup-indents add-list__popup-colors'>
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectColor(color.id)}
                key={color.id}
                color={color.name}
                addClassActive={selectColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addForm} className='add-list__popup-indents button'>
            {isLoading ? "Добавить" : "Добавление..."}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddList;
