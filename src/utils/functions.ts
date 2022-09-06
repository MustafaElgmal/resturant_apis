import { Order } from "./../entities/order";
import { orderItemCreate } from "./../types";

import jwt from "jsonwebtoken";
import { Item } from "../entities/item";
import { OrderItem } from "../entities/orderItem";

export const generationCode = (): string => {
  const min = 100000;
  const max = 1000000;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return `R-${code}`;
};

export const getLengthOforders = (orders: Order[]) => {
  let size = 0;
  orders.forEach((order) => {
    if (!order.isCompleted) {
      size += 1;
    }
  });
  return {
    pendingOrdersLength: size,
    completedOrdersLength: orders.length - size,
  };
};

export const generateAuth = (email: string) => {
  const token = jwt.sign({ email }, process.env.SECRETKEY!);
  return token;
};

export const createOrderItems = async (
  orderItems: orderItemCreate[],
  order: Order
) => {
  let message = "",
    item;
  const size = orderItems.length;
  for (let i = 0; i < size; i++) {
    item = orderItems[i];
    if (item.Qty === undefined || item.Qty <= 0) {
      return { message: "Item Qty is required and should be positive number!" };
    }
    const itemFind = await Item.findOne({ where: { id: item.itemId } });
    if (!itemFind) {
      return { message: "Item not found!" };
    }
    const orderItem = OrderItem.create({
      Qty: item.Qty,
      order,
      item: itemFind,
    });
    await orderItem.save();
  }
  return { message: "" };
};
