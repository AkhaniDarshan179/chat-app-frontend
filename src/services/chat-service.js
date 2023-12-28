import axios from "axios";

const chatService = {
  baseUrl: "http://localhost:8000/api/users",
  getUsers: async () => {
    const userid = localStorage.getItem("userId");
    const result = await axios.get(`${chatService.baseUrl}?userId=${userid}`);
    return result;
  },
};

export default chatService;
