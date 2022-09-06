import { orderCreate, RequestAuthType } from "./../types";
import { Router } from "express";
import { Order } from "../entities/order";
import { auth } from "../middlewares/auth";
import { orderVaildation } from "../utils/validations";
import {
  createOrderItems,
  generationCode,
  getLengthOforders,
} from "../utils/functions";
const router = Router();

router.post("/", auth, async (req: RequestAuthType, res) => {
  let error = orderVaildation(req.body);
  if (error.message !== "") {
    return res.status(400).json(error);
  }
  try {
    const { mobile, city, address, orderItems }: orderCreate = req.body;
    const user = req.user!;
    const orderNo: string = generationCode();
    const order = Order.create({ user, mobile, city, address, orderNo });
    await order.save();
    error = await createOrderItems(orderItems, order);
    if (error.message !== "") {
      await Order.delete({ id: order.id });
      return res.status(400).json(error);
    }

    res.status(201).json({ order });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

router.get("/", auth, async (req: RequestAuthType, res) => {
  if (req.user?.type === "user") {
    return res
      .status(400)
      .json({ messgae: "you should be admin or employee to get orders!" });
  }

  try {
    const orders = await Order.find({
      relations: { user: true, orderItems: { item: true } },
    });
    const lengths = getLengthOforders(orders);
    res.json({ orders, lengths });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

router.get("/:id", auth, async (req: RequestAuthType, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "OrderId is required as params!" });
  }
  if (req.user?.type === "user") {
    return res
      .status(400)
      .json({ messgae: "you should be admin or employee to get order!" });
  }
  try {
    const order = await Order.findOne({
      where: { id: +id },
      relations: { user: true, orderItems: { item: true } },
    });
    if (!order) {
      return res.status(404).json({ message: "Order is not found!" });
    }
    res.json({ order });
  } catch (e) {
    res.status(500).json({ message: "Server is down!" });
  }
});

router.patch("/:id", async (req: RequestAuthType, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "OrderId is required as params!" });
  }
  if (req.user?.type === "user") {
    return res
      .status(400)
      .json({ messgae: "you should be admin or employee to update on order!" });
  }
  try {
    const order = await Order.findOne({ where: { id: +id } });
    if (!order) {
      return res.status(404).json({ message: "Order is not found!" });
    }
    order.isCompleted = true;
    await order.save();
    res.json({ order });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

export default router;
