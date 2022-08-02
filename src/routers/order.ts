import { Router } from "express";
import { Item } from "../entities/item";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/orderItem";
import { User } from "../entities/user";
import { orderVaildation } from "../functions";
import { itemType, orderItemType } from "../types";
const router = Router();

router.post("/", async (req, res) => {
  const errors = orderVaildation(req.body);
  if (errors.message !== "") {
    return res.status(400).send(errors);
  }
  try {
    const { userId, orderPhone, orderCity, orderAddress, items } = req.body;
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).send({ message: "user is not found!" });
    }
    const order = Order.create({ user, orderPhone, orderCity, orderAddress });
    await order.save();
    items.forEach(async (item: orderItemType) => {
      const itemFind = await Item.findOne({ where: { id: item.itemId } });
      if (!itemFind) {
        return res.status(404).send({ message: "Item is not found!" });
      }
      const orderItem = OrderItem.create({
        Qty: item.Qty,
        order,
        item: itemFind,
      });
      await orderItem.save();
    });
    res.status(201).send({ message: "order is created!" });
  } catch (e) {
    res.status(500).send({ error: "Server is down!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({
      relations: { user: true, orderItems: true },
    });
    res.send({ orders });
  } catch (e) {
    res.status(500).send({ error: "Server is down!" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "OrderId is required as params!" });
  }
  try {
    const order = await Order.findOne({
      where: { id: +id },
      relations: { user: true, orderItems: true },
    });
    if (!order) {
      return res.status(404).send({ message: "Order is not found!" });
    }
    res.send({ order });
  } catch (e) {
    res.status(500).send({ message: "Server is down!" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "OrderId is required as params!" });
  }
  try {
    const order = await Order.findOne({ where: { id: +id } });
    if (!order) {
      return res.status(404).send({ message: "Order is not found!" });
    }
    order.isCompleted = true;
    await order.save();
    res.send({message:'Order is updated!'})
  } catch (e) {
    res.status(500).send({ error: "Server is down!" });
  }
});

export default router;
