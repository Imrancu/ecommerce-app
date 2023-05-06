import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect();
    if(method === "POST"){
        const {title, price, description} = req.body;
    const productDoc = await Product.create({
        title, price, description
    })
        res.json(productDoc);
    }
}