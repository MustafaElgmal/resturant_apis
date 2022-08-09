import { Router } from "express";
import { Item } from "../entities/item";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/orderItem";
import { User } from "../entities/user";
import {
  createOrderItems,
  generationCode,
  getLengthOforders,
  orderVaildation,
} from "../utils";
import { itemType, orderItemType } from "../types";
const router = Router();

router.post("/", async (req, res) => {
  let errors =orderVaildation(req.body);
  if (errors.message !== "") {
    return res.status(400).json(errors);
  }
  try {
    const { user, mobile, city, address, orderItems } = req.body;
    const userFind = await User.findOne({ where: { id: user.id } });
    if (!userFind) {
      return res.status(404).json({ message: "User not found!" });
    }

    const orderNo =generationCode();
    const order = Order.create({ user, mobile, city, address, orderNo });
    await order.save();
    errors = await createOrderItems(orderItems, order);
    console.log(errors);
    if (errors.message !== "") {
      await Order.delete({ id: order.id });
      return res.status(400).json(errors);
    }

    res.status(201).json({ order });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "OrderId is required as params!" });
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

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "OrderId is required as params!" });
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
