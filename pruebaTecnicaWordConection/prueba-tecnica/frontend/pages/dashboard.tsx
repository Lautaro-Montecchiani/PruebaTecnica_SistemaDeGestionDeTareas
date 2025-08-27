import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch('http://localhost:4000/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar las tareas');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando tareas...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Tareas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-4 p-4 bg-white rounded shadow">
            <div className="font-semibold">{task.title}</div>
            <div className="text-gray-600">{task.description}</div>
            <div className="text-sm mt-2">Estado: <span className="font-mono">{task.status}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
