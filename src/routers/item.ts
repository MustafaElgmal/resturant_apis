import { Router } from "express";
import { Category } from "../entities/category";
import { Item } from "../entities/item";
import { itemValidation } from "../functions";

const router = Router();

router.post("/:id", async (req, res) => {
    const {id}=req.params
    if(!id){
        return res.status(400).send({message:'CategoryId is required as paramters!'})
    }
  const errors = await itemValidation(req.body);
  if (errors.message !== "") {
    return res.status(400).send(errors);
  }
  try {
    const { name, description, price, popular ,imgUrl} = req.body;
    const cate=await Category.findOneBy({id:+id})
    if(!cate){
        return res.status(404).send({message:'Category is not found!'})
    }
    const item = Item.create({
      name,
      description,
      price,
      popular,
      imgUrl,
      category:cate
    });
    await item.save();
    res.status(201).send({ item});
  } catch (e) {
    res.status(500).send({ error: "Server is down!" });
  }
});
router.get("/", async (req, res) => {
  try {
    const items = await Item.find({relations:{category:true}});
    res.send({ items });
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: "Server is down!" });
  }
});

export default router;
