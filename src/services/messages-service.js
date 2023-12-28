import axios from "axios";

const messagesService = {
  baseUrl: "http://localhost:8000/api/messages",
  getMessages: async () => {
    const result = await axios.get(`${messagesService.baseUrl}/:user1:user2`);
    return result;
  },
};

export default messagesService;
