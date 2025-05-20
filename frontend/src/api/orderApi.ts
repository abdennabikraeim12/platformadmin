import type { Order } from "../types/order";
import { apiClient } from "./apiClient";

export const fetchOrders = async (): Promise<Order[]> => {
  const { data } = await apiClient.get<Order[]>("/orders");
  return data;
};
