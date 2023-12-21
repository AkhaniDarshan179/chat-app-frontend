import axios from "axios";

const registerService = {
  baseUrl: "http://localhost:8000/api/register",
  register: async (body) => {
    const result = await axios.post(`${registerService.baseUrl}`, body);
    return result;
  },
};

export default registerService;
