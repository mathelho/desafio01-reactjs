import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const idTask: number = (Math.random() * 10); // id random
    
    const creatingTask: Task = {
      id: idTask,
      title: newTaskTitle,
      isComplete: false
    }

    console.log(creatingTask);

    if (creatingTask.title != '') { // nao permitir criar caso o título seja vazio!
      setTasks(tarefa => [...tarefa, creatingTask]);
      setNewTaskTitle('');
    } else {
      alert('Título vazio! Não é possível adicionar a tarefa.');
    }
    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const confirmTask = tasks.map(item => {
      if (item.id == id) {
        return { // se encontrar a task com o ID, retorna um novo objeto com um novo isComplete
          ...item,
          isComplete: !item.isComplete
        }

      } else { // caso contrário só retorna o objeto que já está lá
        return item;
      }
    })

    setTasks(confirmTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const tasksWithoutRemovedOne = tasks.filter(item => item.id != id);

    setTasks(tasksWithoutRemovedOne);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}