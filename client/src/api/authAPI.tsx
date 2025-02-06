import { UserLogin } from "../interfaces/UserLogin";
import { post } from "../utils/api";

const login = async (userInfo: UserLogin) => {
  return post('/auth/login', userInfo, { requiresAuth: false });
};

export { login };
