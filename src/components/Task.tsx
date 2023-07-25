import { Trash } from '@phosphor-icons/react'

import styles from './Task.module.css'

export type TaskTypes = {
  id: string
  content: string
  done: boolean
}

interface TaskProps {
  task: TaskTypes
  onRemove: (id: string) => void
  onToggle: (id: string) => void
}

export function Task({ task, onRemove, onToggle }: TaskProps) {

  function handleRemoveTask() {
    onRemove(task.id)
  }

  function handleToggleTask() {
    onToggle(task.id)
  }

  return (
    <li className={styles.task}>
      <input type="checkbox" checked={task.done} onChange={handleToggleTask} />
      <p className={task.done ? styles.cutText : ""}>{task.content}</p>
      <button onClick={handleRemoveTask}>
        <Trash weight="bold" />
      </button>
    </li>
  )
}
