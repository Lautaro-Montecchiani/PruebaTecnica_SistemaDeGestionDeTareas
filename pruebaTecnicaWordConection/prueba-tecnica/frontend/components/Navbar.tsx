import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica si hay token en localStorage para mostrar enlaces según sesión
    setIsLogged(!!localStorage.getItem('token'));
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="font-bold text-lg">
        <Link href="/">Sistema de Tareas</Link>
      </div>
      <div className="flex gap-4 items-center">
        {!isLogged && <Link href="/login">Iniciar sesión</Link>}
        {!isLogged && <Link href="/register">Registrarse</Link>}
        {isLogged && <Link href="/dashboard">Dashboard</Link>}
        {isLogged && (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">Salir</button>
        )}
      </div>
    </nav>
  );
}
