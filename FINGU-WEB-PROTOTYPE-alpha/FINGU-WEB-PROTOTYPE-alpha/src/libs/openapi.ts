import createClient from "openapi-fetch";
import { paths as CHATBOT_SERVER_PATH } from "../types/chatServer";

export const CHATBOT_SERVER_BASE_URL = process.env.NEXT_PUBLIC_CHATBOT_SERVER_BASE_URL;

// check configs
if (!CHATBOT_SERVER_BASE_URL) {
    throw new Error("CHATBOT_SERVER_BASE_URL is not defined");
}

export const chatbotServer = createClient<CHATBOT_SERVER_PATH>({ baseUrl: CHATBOT_SERVER_BASE_URL });