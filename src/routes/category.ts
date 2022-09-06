import { RequestAuthType } from "./../types";
import { Router } from "express";
import { Category } from "../entities/category";
import { auth } from "../middlewares/auth";
import { categoryValidation } from "../utils/validations";

const router = Router();

router.post("/", auth, async (req: RequestAuthType, res) => {
  if (req.user?.type !== "admin") {
    return res
      .status(400)
      .json({ messgae: "you should be admin to create category!" });
  }
  const error = await categoryValidation(req.body);
  if (error.message !== "") {
    return res.status(400).json(error);
  }

  try {
    const { name }: { name: string } = req.body;
    const category = Category.create({
      name,
    });
    await category.save();
    res.status(201).json({ category });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

export default router;
