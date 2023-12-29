import axios from "axios";

const messagesService = {
  baseUrl: "http://localhost:8000/api/allmessages",
  getMessages: async (body) => {
    const result = await axios.post(`${messagesService.baseUrl}`, body);
    return result.data;
  },
};

export default messagesService;
