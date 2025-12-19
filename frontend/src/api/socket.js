// A single socket instance for the whole frontend. This avoids reconnecting on every page and keeps it simple.

import { io } from "socket.io-client";

//Vite’s way of accessing environment variables
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";

//Creates the actual socket connection
export const socket = io(SOCKET_URL);