import axios from "axios";

const loginService = {
  baseUrl: "http://localhost:8000/api/login",
  login: async (body) => {
    const result = await axios.post(`${loginService.baseUrl}`, body);
    localStorage.setItem("userId", result.data.userId);
    return result;
  },
};

export default loginService;
