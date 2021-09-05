import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Route, useHistory, useLocation} from 'react-router-dom';
import AddList from './components/AddList/AddList';

import List from './components/Lists/List';
import Task from './components/Tasks/Task';

const App = () => {
  const [lists, setLists] = useState();
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();
  let Location = useLocation();
  // console.log(Location);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({data}) => {
        setLists(data);
      })
      .catch((error) => console.error(error));
    axios
      .get('http://localhost:3001/colors')
      .then(({data}) => {
        setColors(data);
      })
      .catch((error) => console.error(error));
  }, []);
  //! Листы
  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (listId && lists) {
      const foundList = lists.find(item => item.id === Number(listId));
      setActiveItem(foundList);
    } else setActiveItem(null)
  }, [lists, Location.pathname, history.location.pathname])
  
  //! Задачи
  const onEditTitle = (item) => {
    let newTitle = window.prompt('Название списка', item.name);
    if (newTitle) {
      axios
        .patch('http://localhost:3001/lists/' + item.id, {
          name: newTitle,
        })
        .then(({data}) => {
          if (data) editTitleLists(item.id, newTitle);
        })
        .catch((error) => console.error(error));
    }
  };
  const editTitleLists = (id, nameTitle) => {
    console.log(id, nameTitle);
    let newList = lists.map((item) => {
      if (item.id === id) {
        item.name = nameTitle;
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (item) => {
    console.log(item);
    let editTask = window.prompt('Название списка', item.text);
    if (!editTask) return;
    axios
      .patch('http://localhost:3001/tasks/' + item.id, {
        text: editTask,
      })
      .then(({data}) => {
        editTaskLists(data);
      })
      .catch((error) => console.error(error));
  };
  const editTaskLists = (task) => {
    let newLists = lists.map((item) => {
      if (item.id === task.listId) {
        item.tasks = item.tasks.map((elem) => {
          if (elem.id === task.id) {
            elem.text = task.text;
          }
          return elem;
        });
      }
      return item;
    });
    setLists(newLists);
  };

  const onRemoveTask = (taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      axios.delete('http://localhost:3001/tasks/' + taskId).then(() => {
        console.log(taskId);
        removeTaskLists(taskId);
      });
    }
  };
  const removeTaskLists = (taskId) => {
      let newLists = lists.map((item) => {
        item.tasks = item.tasks.filter(task => task.id !== taskId);
        return item;
      });
      setLists(newLists);
  };
  const onAddTask = (listId, newTask) => {
    console.log(listId, newTask);
    let newLists = lists.map((item) => {
    if (item.id === listId) {
      item.tasks = [...item.tasks, newTask]
      }
      return item;
    })
    setLists(newLists);
  }
  
  return (
    <div className='todo'>
      <div className='todo__slider'>
        {/* Все задачи */}
        <List
          items={[
            {
              icon: (
                <svg className='listSvg' width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z'
                    fill='black'
                  />
                </svg>
              ),
              name: 'Все задачи',
              active : history.location.pathname === "/",
            },
          ]}
          isActive
          onClickItem = {() => history.push('/')}
        />
        {/* Лист задачи */}
        {lists ? (
          <List
            items={lists}
            isRemovable
            activeItem={activeItem}
            onClickItem={(item) => history.push(`/lists/${item.id}`)}
            onRemove={(onRemove) => {
              let newList = lists.filter((item) => item.id !== onRemove);
              setLists(newList);
            }}

          />
        ) : (
          <div className='todo__slider-preloader'>
            <h2>Загрузка...</h2>
          </div>
        )}
        {/*Добавить лист задачи */}
        {colors && <AddList onAdd={onAddList} colors={colors}  />}
      </div>
      {/* Список задачи */}
      <div className='todo__tasks'>
        <Route exact path='/'>
          {lists && lists.map((item) => 
          <Task key={item.id} 
          list={item} 
          editTitle={onEditTitle} 
          editTask={onEditTask} 
          removeTask={onRemoveTask} 
          onAddTask = {onAddTask} 

          />)}
        </Route>
        <Route path='/lists/:id'>
          {lists && activeItem &&
          <Task 
          list={activeItem} 
          editTitle={onEditTitle} 
          editTask={onEditTask} 
          removeTask={onRemoveTask} 
          onAddTask = {onAddTask} 
          />}
        </Route>
      </div>
    </div>
  );
};;

export default App;
