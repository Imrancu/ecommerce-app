import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title: existingTitle,
    price: existingPrice,
    description: existingDescription,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [goToProducts, setGoToProducts] = useState('');
    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, price, description };
        if (_id) {
            // Update Product
            await axios.put('/api/products', { ...data, _id })
        } else {
            // Create Product
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    async function uploadImages(e){
        const files = e.target?.files;
        if(files?.length > 0){
            const data = new FormData();
            for(let file of files){
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data);
        }
    }
    return (
        <form onSubmit={saveProduct}>
            <input
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <div className="mb-2">
                <label className="w-24 h-24 border text-center flex items-center justify-center cursor-pointer gap-1 text-sm text-gray-500 rounded-md bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                    <input onChange={uploadImages} type="file" className="hidden" />
                </label>
                {!images?.length && (
                    <div>No photo in this product</div>
                )}
            </div>
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
                type="submit" className="btn-primary">Save Now</button>
        </form>
    )
}