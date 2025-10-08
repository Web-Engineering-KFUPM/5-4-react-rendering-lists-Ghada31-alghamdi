import { useState } from "react";
import TaskItem from "./TaskItem";


export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");



  function toggleTask(id) {
    onMutateCourse(index, tasks => tasks.map(t=> (t.id === id ? {...t, isDone: !t.isDone} : t)))
    

  }
  // 📘 TASK 4 — PART A (Anchor): Implement delete using onMutateCourse + .filter()
  function deleteTask(id) {
    // TODO: delete the task with this id
    onMutateCourse(index, tasks => tasks.filter((t) => t.id !== id));
  }


  // 📘 TASK 4 — PART A (Anchor): Implement add using onMutateCourse
  function addTask(e) {
    e.preventDefault();
    // TODO: create a new task { id, title, dueDate: date, isDone: false }
    // TODO: append it to existing tasks and reset inputs
    if(!title.trim()|| !date) return
    const newTask={id: Math.random().toString(36).slice(2,9),title,dueDate: date, isDone: false};

    onMutateCourse(index,tasks =>[...tasks,newTask]);
    setTitle("");
    setDate("");
  }


  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {(course.tasks.length > 0 && course.tasks.every(t=>t.isDone))&&<p>All caught up</p>}
      </header>

      <section className="tasksSection">
        {course.tasks.length === 0  ? (<p>No tasks yet. Add your first one!</p>) :(
        <ul className="tasks">
          {course.tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} 
          />)}
        </ul>
         )}
      </section>

      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}