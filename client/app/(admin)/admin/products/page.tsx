"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
    })

    const [image, setImage] = useState<File | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [search, page])

    const fetchProducts = async () => {
        const res = await API.get(`/products?search=${search}&page=${page}`)
        setProducts(res.data)
    }

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImage = (e: any) => {
        setImage(e.target.files[0])
    }

    const addProduct = async () => {
        const data = new FormData()

        data.append("name", form.name)
        data.append("description", form.description)
        data.append("price", form.price)
        data.append("stock", form.stock)
        data.append("category_id", form.category_id)

        if (image) {
            data.append("image", image)
        }

        await API.post("/products", data)

        resetForm()
        fetchProducts()
    }


    const updateProduct = async () => {
        if (!editingId) return

        const data = new FormData()

        data.append("name", form.name)
        data.append("description", form.description)
        data.append("price", form.price)
        data.append("stock", form.stock)
        data.append("category_id", form.category_id)

        if (image) {
            data.append("image", image)
        }

        await API.put(`/products/${editingId}`, data)

        setEditingId(null)
        resetForm()
        fetchProducts()
    }

    const deleteProduct = async (id: number) => {
        await API.delete(`/products/${id}`)
        fetchProducts()
    }

    const editProduct = (p: any) => {
        setEditingId(p.id)

        setForm({
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
            category_id: p.category_id || ""
        })
    }

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            price: "",
            stock: "",
            category_id: "",
        })
        setImage(null)
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Product Management</h1>

            {/* SEARCH */}
            <input placeholder="Search product..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 w-full mb-6" />

            {/* PRODUCT FORM */}
            <div className="border p-6 rounded mb-10 space-y-4">
                <input name="name" value={form.name} placeholder="Product name" onChange={handleChange} className="border p-2 w-full" />
                <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
                <input name="price" value={form.price} placeholder="Price" onChange={handleChange} className="border p-2 w-full" />
                <input name="stock" value={form.stock} placeholder="Stock" onChange={handleChange} className="border p-2 w-full" />
                <input name="category_id" value={form.category_id} placeholder="Category ID" onChange={handleChange} className="border p-2 w-full" />
                <input type="file" onChange={handleImage} className="border p-2 w-full" />

                {editingId ? (
                    <button onClick={updateProduct} className="bg-blue-600 text-white px-6 py-2 rounded" >Update Product</button>
                ) : (
                    <button onClick={addProduct} className="bg-green-600 text-white px-6 py-2 rounded" >Add Product</button>
                )}

            </div>

            {/* PRODUCT LIST */}
            <div className="grid grid-cols-3 gap-6">
                {products.map((p: any) => (
                    <div key={p.id} className="border p-4 rounded space-y-2">
                        <img src={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`} className="h-40 w-full object-cover" alt={p.name} />
                        <h3 className="font-bold">{p.name}</h3>
                        <p>NPR {p.price}</p>
                        <div className="flex gap-2">
                            <button onClick={() => editProduct(p)} className="bg-blue-500 text-white px-3 py-1 rounded" >Edit</button>
                            <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-3 py-1 rounded" >Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex gap-4 mt-10">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-gray-300 px-4 py-2 rounded" > Prev </button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)} className="bg-gray-300 px-4 py-2 rounded" > Next </button>
            </div>
        </div>
    )
}