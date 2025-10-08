function daysUntil(dateStr) {
  const today = new Date();
  const due = new Date(dateStr + "T00:00:00");
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  return diff;
}


export default function DueBadge({ dueDate }) {
  const d=daysUntil(dueDate)
  const label =d < 0? "Overdue": d === 0? "Due today": d === 1? "1 day remaining": `${d} days remaining`;
  const extra =d < 0? "danger": d === 0? "warn": "";
  
  return <span className={`badge ${extra}`}>{label}</span>;
}