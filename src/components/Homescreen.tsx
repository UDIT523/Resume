import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { ResumeData } from '../types/resume';

export interface Resume {
  _id: string;
  name: string;
  data: ResumeData;
}

interface HomescreenProps {
  setToken: (token: string) => void;
  loadResume: (resume: Resume) => void;
}

const Homescreen: React.FC<HomescreenProps> = ({ setToken, loadResume }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/resumes', {
        headers: { 'x-auth-token': token },
      });
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchResumes();
    }
  }, []);

  return (
    <div>
      {localStorage.getItem('token') ? (
        <div>
          <h2>Your Resumes</h2>
          {resumes.map((resume) => (
            <div key={resume._id}>
              <h3>{resume.name}</h3>
              <button onClick={() => loadResume(resume)}>Load</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {showLogin ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              <p onClick={() => setShowLogin(false)}>
                Don't have an account? Register
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Register</button>
              <p onClick={() => setShowLogin(true)}>
                Already have an account? Login
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Homescreen;
