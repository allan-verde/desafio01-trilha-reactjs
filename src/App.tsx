import { v4 as uuidv4 } from 'uuid'

import './styles/global.css'
import styles from './App.module.css'

import todoLogo from './assets/logo.svg'
import ClipboardImg from './assets/clipboard.svg'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Task, TaskTypes } from './components/Task'

function App() {
  const [tasks, setTasks] = useState<TaskTypes[]>([])

  const [inputText, setInputText] = useState('')

  function handleChangeInputText(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value

    setInputText(value)
  }

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!inputText) return

    const newTask: TaskTypes = {
      id: uuidv4(),
      content: inputText,
      done: false
    }

    setTasks((prevState) => [
      newTask,
      ...prevState.filter(task => !task.done),
      ...prevState.filter(task => task.done)
    ])

    setInputText('')
  }

  function handleDeleteTask(id: string) {
    setTasks((prevState) => prevState.filter(task => task.id !== id))
  }

  function handleToggleTask(id: string) {
    setTasks((prevState) => {
      return prevState
        .map(task => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done
            }
          }
    
          return task
        })
        .sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1)
    })
  }

  return (
    <div>
      <header className={styles.header}>
        <img src={todoLogo} alt="Logo do Todo List" />
      </header>

      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={handleCreateNewTask}
        >
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={inputText}
            onChange={handleChangeInputText}
          />
          <button>Criar +</button>
        </form>

        <div className={styles.numbers}>
          <div>
            <p>Tarefas criadas</p>
            <span>
              {tasks.length}
            </span>
          </div>
          <div>
            <p>Concluidas</p>
            <span>
              {`${tasks.filter(task => task.done).length} de ${tasks.length}`}
            </span>
          </div>
        </div>

        <div className={styles.taskList}>
          {
            tasks.length > 0 
              ? (
                tasks.map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    onRemove={handleDeleteTask}
                    onToggle={handleToggleTask}
                  />
                ))
              ) 
              : (
                <div className={styles.noChores}>
                  <img src={ClipboardImg} alt="clipboard" />
                  <p>Você ainda não tem tarefas cadastradas</p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              )
          }
        </div>
      </main>
    </div>
  )
}

export default App
