import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const [productInfo, setProductInfo] = useState();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/products?id=' + id).then(response => {
            setProductInfo(response.data);
        })
    }, [id])
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack();
    }
    function goBack() {
        router.push('/products')
    }
    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete product
                &nbsp;"{productInfo?.title}"?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteProduct}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    )
}