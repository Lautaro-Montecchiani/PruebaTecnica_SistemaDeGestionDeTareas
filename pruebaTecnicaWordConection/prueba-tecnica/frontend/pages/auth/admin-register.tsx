// Archivo eliminado para restaurar el estado previo a su creación.
import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function AdminRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmailError('');
    setPasswordError('');
    let valid = true;
    if (!email) {
      setEmailError('El email es obligatorio');
      valid = false;
    }
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      valid = false;
    }
    if (!valid) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/auth/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al registrarse como admin');
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro Admin</h2>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="new-password"
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <Button type="submit" loading={loading} color="green">
          Registrarse como Admin
        </Button>
      </form>
    </div>
  );
}
import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function AdminRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmailError('');
    setPasswordError('');
    let valid = true;
    if (!email) {
      setEmailError('El email es obligatorio');
      valid = false;
    }
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      valid = false;
    }
    if (!valid) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/auth/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al registrarse como admin');
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro Admin</h2>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="new-password"
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <Button type="submit" loading={loading} color="green">
          Registrarse como Admin
        </Button>
      </form>
    </div>
  );
}
