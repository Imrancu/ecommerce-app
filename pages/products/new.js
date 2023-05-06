import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    async function createProduct(e){
        e.preventDefault();
        const data = {title, price, description};
        await axios.post('/api/products', data)
    }
    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    type="submit" className="btn-primary">Add Now</button>
            </form>
        </Layout>
    )
}