import { itemCreate, RequestAuthType } from "./../types";
import { Router } from "express";
import { Category } from "../entities/category";
import { Item } from "../entities/item";
import { auth } from "../middlewares/auth";
import { itemValidation } from "../utils/validations";

const router = Router();

router.post("/:id", auth, async (req: RequestAuthType, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "CategoryId is required as paramters!" });
  }
  if (req.user?.type !== "admin") {
    return res
      .status(400)
      .json({ messgae: "you should be admin to create Item!" });
  }
  const error = itemValidation(req.body);
  if (error.message !== "") {
    return res.status(400).json(error);
  }
  try {
    const { name, description, price, popular, imgUrl }: itemCreate = req.body;
    const category = await Category.findOneBy({ id: +id });
    if (!category) {
      return res.status(404).json({ message: "Category is not found!" });
    }
    const item = Item.create({
      name,
      description,
      price,
      popular,
      imgUrl,
      category,
    });
    await item.save();
    res.status(201).json({ item });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({ relations: { category: true } });
    res.json({ items });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

export default router;
