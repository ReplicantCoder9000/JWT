import { useState, FormEvent, ChangeEvent } from "react";
import styles from './Login.module.css'; // Reusing login styles
import { useNavigate, Link } from "react-router-dom";
import Auth from '../utils/auth';
import { register } from "../api/authAPI";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
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
    setRegisterData({
      ...registerData,
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
      const response = await register(registerData);
      Auth.login(response.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Create Account</h1>
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
            value={registerData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-label="Username"
            placeholder="Choose a username"
          />
        </div>
        <div className={styles['form-group']}>
          <label>Password</label>
          <input 
            type='password'
            name='password'
            value={registerData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-label="Password"
            placeholder="Choose a password"
          />
        </div>
        <button 
          type='submit' 
          disabled={isLoading}
          className={isLoading ? styles.loading : ''}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        <p className={styles.switchForm}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
