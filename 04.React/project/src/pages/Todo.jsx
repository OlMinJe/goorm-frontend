import { useState } from 'react'

export default function Todo() {
  const [task, setTask] = useState([])
  const [input, setInput] = useState('')

  const addTask = () => {
    if (input.trim() === '') {
      return
    }
    setTask([...task, { id: Date.now(), text: input }])
    setInput('')
  }

  const toggleTask = (id) => setTask(task.filter((task) => task.id !== id))

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="할 일을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>추가</button>
      </div>
      <ul />
      {task.length === 0 && <p>할 일이 없습니다.</p>}
      {task.map((task) => (
        <li key={task.id} className="">
          <span>{task.text}</span>
          <button onClick={() => toggleTask(task.id)}>삭제</button>
        </li>
      ))}
    </div>
  )
}
