import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (!decoded.exp) return true;
      
      // Compare expiration time with current time
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
