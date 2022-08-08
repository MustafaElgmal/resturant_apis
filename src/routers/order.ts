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
} from "../functions";
import { itemType, orderItemType } from "../types";
const router = Router();

router.post("/", async (req, res) => {
  let errors = await orderVaildation(req.body);
  if (errors.message !== "") {
    return res.status(400).send(errors);
  }
  try {
    const { user, mobile, city, address, orderItems } = req.body;
    const userFind=await User.findOne({where:{id:user.id}})
    if(!userFind){
      return res.status(404).send({message:'User not found!'})
    }
   
    const orderNo = await generationCode();
    const order = Order.create({ user, mobile, city, address, orderNo });
    await order.save();
    errors = await createOrderItems(orderItems, order);
    console.log(errors);
    if (errors.message !== "") {
      await Order.delete({ id: order.id });
      return res.status(400).send(errors);
    }

    res.status(201).send({ order });
  } catch (e) {
    res.status(500).send({ error: "Server is down!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({
      relations: { user: true, orderItems: { item: true } },
    });
    const lengths = await getLengthOforders(orders);
    res.send({ orders, lengths });
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
      relations: { user: true, orderItems: { item: true } },
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
    res.send({ order });
  } catch (e) {
    res.status(500).send({ error: "Server is down!" });
  }
});

export default router;
