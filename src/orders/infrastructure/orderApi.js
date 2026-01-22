import BaseApi from "../../shared/infrastructure/api/baseApi.js";

class OrderApi extends BaseApi {
  constructor() {
    super(import.meta.env.VITE_ROUTE_STORE);
  }

  getOrders() {
    return this.get("/orders");
  }

  createOrder(order) {
    return this.post("/orders", order);
  }

  updateOrder(id, data) {
    return this.patch(`/orders/${id}`, data);
  }
  deleteOrder(id) {
    return this.delete(`/orders/${id}`);
  }
}

export const orderApi = new OrderApi();
