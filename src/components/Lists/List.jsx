import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import removeSvg from '../../assets/svgs/remove.svg';
import Badge from '../Badge/Badge';
import './List.scss';

function List({items, isRemovable, activeItem, onClick, onRemove, onClickItem}) {
  const deleteList = (deleteId) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + deleteId).then(() => {
        onRemove(deleteId);
      })
    }
  }
  // debugger;
  return (
    <ul className='todo__list' onClick={onClick}>
      {items.map((item, index) => (
        <li key = {index} 
        onClick = {onClickItem ? () => onClickItem(item) : null} 
        className={classNames({active: item.active ? (item.active) : (activeItem && activeItem.id === item.id)}, item.addClassName)}>

          {item.icon ? <i>{item.icon}</i> : <Badge key={item.id} color = {item.color.name} />}

          <span>{item.name} {item.tasks && ` (${item.tasks.length})`}</span>


          {isRemovable && <img onClick = {()=> deleteList(item.id)} src={removeSvg} alt='remove list' />}  
        </li>
      ))}

    </ul>
  );
}

export default List;
