// src/lib/api/clients.ts
import API from "./axios";
import { Client } from "@/types/client"; // Assume you’ll define types later

export const fetchClients = () => API.get("/clients");
export const fetchClientById = (id: string) => API.get(`/clients/${id}`);
export const createClient = (data: Client) => API.post("/clients", data);
export const updateClient = (id: string, data: Client) => API.put(`/clients/${id}`, data);
export const deleteClient = (id: string) => API.delete(`/clients/${id}`);
