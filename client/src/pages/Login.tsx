import { useState, FormEvent, ChangeEvent } from "react";
import styles from './Login.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (Auth.loggedIn()) {
    navigate('/');
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await login(loginData);
      Auth.login(response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && (
          <div className={styles['error-message']}>
            {error}
          </div>
        )}
        <div className={styles['form-group']}>
          <label>Username</label>
          <input 
            type='text'
            name='username'
            value={loginData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-label="Username"
            placeholder="Enter your username"
          />
        </div>
        <div className={styles['form-group']}>
          <label>Password</label>
          <input 
            type='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-label="Password"
            placeholder="Enter your password"
          />
        </div>
        <button 
          type='submit' 
          disabled={isLoading}
          className={isLoading ? styles.loading : ''}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
