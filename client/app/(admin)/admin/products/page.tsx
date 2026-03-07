"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"

export default function ProductsPage() {

    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: ""
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {

        const res = await API.get("/products")

        setProducts(res.data)

    }

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const addProduct = async () => {

        await API.post("/products", form)

        fetchProducts()

    }

    const deleteProduct = async (id: number) => {

        await API.delete(`/products/${id}`)

        fetchProducts()

    }

    return (

        <div>

            <h1 className="text-3xl font-bold text-green-700 mb-8">
                Product Management
            </h1>

            {/* Add Product Form */}

            <div className="border p-6 rounded mb-10 space-y-4">

                <input
                    name="name"
                    placeholder="Product name"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <input
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <input
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <button
                    onClick={addProduct}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Add Product
                </button>

            </div>

            {/* Product List */}

            <div className="grid grid-cols-3 gap-6">

                {products.map((p: any) => (

                    <div
                        key={p.id}
                        className="border p-4 rounded space-y-2"
                    >

                        <img src={p.image} className="h-40 w-full object-cover" />

                        <h3 className="font-bold">
                            {p.name}
                        </h3>

                        <p>
                            Rs {p.price}
                        </p>

                        <button
                            onClick={() => deleteProduct(p.id)}
                            className="bg-red-500 text-white px-4 py-1 rounded"
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>

    )
}