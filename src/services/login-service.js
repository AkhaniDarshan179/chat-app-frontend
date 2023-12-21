import axios from "axios";

const loginService = {
  baseUrl: "http://localhost:8000/api/login",
  login: async (body) => {
    const result = await axios.post(`${loginService.baseUrl}`, body);
    return result;
  },
};

export default loginService;
