import axios from "axios";

const chatService = {
  baseUrl: "http://localhost:8000/api/users",
  getUsers: async () => {
    const result = await axios.get(`${chatService.baseUrl}`);
    return result;
  },
};

export default chatService;
