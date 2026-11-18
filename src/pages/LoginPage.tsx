import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Đăng nhập</h1>
      <label>
        Tên người dùng
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
      </label>
      <label>
        Mật khẩu
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="btn btn-primary" type="submit">Đăng nhập</button>
    </form>
  );
}
