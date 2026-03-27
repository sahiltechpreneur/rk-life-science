"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { FiEdit3, FiTrash2, FiPlus, FiSearch, FiX, FiImage, FiBox, FiDollarSign, FiAlignLeft, FiPackage } from "react-icons/fi"

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    })

    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [search, page])

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await API.get(`/products?search=${search}&page=${page}`)
            if (Array.isArray(res.data)) {
                setProducts(res.data)
            } else {
                setError("Invalid data format received")
            }
        } catch (error: any) {
            console.error("Failed to fetch products", error)
            setError(error.response?.data?.error || "Failed to fetch products")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImage = (e: any) => {
        const file = e.target.files[0]
        setImage(file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData()

        data.append("name", form.name)
        data.append("description", form.description)
        data.append("price", form.price)
        data.append("stock", form.stock)

        if (image) {
            data.append("image", image)
        }

        try {
            if (editingId) {
                await API.put(`/products/${editingId}`, data)
            } else {
                await API.post("/products", data)
            }
            closeForm()
            fetchProducts()
        } catch (error) {
            console.error("Failed to save product", error)
        }
    }

    const deleteProduct = async (id: number) => {
        if (!confirm("Delete this product?")) return
        try {
            await API.delete(`/products/${id}`)
            fetchProducts()
        } catch (error) {
            console.error("Failed to delete product", error)
        }
    }

    const editProduct = (p: any) => {
        setEditingId(p.id)
        setForm({
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
        })
        setImagePreview(p.image?.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`)
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setForm({ name: "", description: "", price: "", stock: "" })
        setImage(null)
        setImagePreview(null)
        setEditingId(null)
        setIsFormOpen(false)
    }

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <FiPackage className="w-5 h-5 text-emerald-600" />
                    <h1 className="text-xl font-semibold text-gray-800">Products</h1>
                </div>
                <p className="text-sm text-gray-500">Manage your product catalog</p>
            </div>

            {/* Search and Add */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        placeholder="Search products..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                    />
                </div>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <FiPlus className="w-4 h-4" />
                    Add product
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={fetchProducts} className="text-xs font-medium underline">Retry</button>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-xl border border-gray-100 p-4">
                            <div className="w-full h-40 bg-gray-100 rounded-lg mb-3"></div>
                            <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2 mb-3"></div>
                            <div className="flex justify-between">
                                <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))
                ) : products.length > 0 ? (
                    products.map((p: any) => (
                        <div key={p.id} className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all relative">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button 
                                    onClick={() => editProduct(p)} 
                                    className="p-1.5 bg-white rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 shadow-sm transition-colors"
                                    title="Edit"
                                >
                                    <FiEdit3 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                    onClick={() => deleteProduct(p.id)} 
                                    className="p-1.5 bg-white rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 shadow-sm transition-colors"
                                    title="Delete"
                                >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            
                            <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                                {p.image ? (
                                    <img 
                                        src={p.image.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`} 
                                        className="h-full w-full object-cover" 
                                        alt={p.name} 
                                    />
                                ) : (
                                    <FiBox className="w-8 h-8 text-gray-300" />
                                )}
                            </div>
                            
                            <h3 className="font-medium text-gray-800 text-sm line-clamp-1 mb-1">{p.name}</h3>
                            <p className="text-gray-400 text-xs line-clamp-2 mb-2">{p.description}</p>
                            
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                <div>
                                    <span className="text-[10px] text-gray-400">Price</span>
                                    <p className="font-semibold text-gray-800 text-sm">NPR {Number(p.price).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-gray-400">Stock</span>
                                    <p className={`text-sm font-medium ${p.stock > 10 ? 'text-emerald-600' : p.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                                        {p.stock} left
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FiPackage className="w-5 h-5 text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-500">
                            {search ? "No products match your search" : "No products added yet"}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {products.length > 0 && (
                <div className="flex justify-center items-center gap-2 pt-4">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        disabled={page === 1} 
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    > 
                        Previous 
                    </button>
                    <span className="px-3 py-1.5 text-sm bg-emerald-50 text-emerald-600 rounded-lg font-medium">
                        {page}
                    </span>
                    <button 
                        onClick={() => setPage(p => p + 1)} 
                        disabled={products.length < 8}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    > 
                        Next 
                    </button>
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-base font-semibold text-gray-800">{editingId ? 'Edit product' : 'Add product'}</h2>
                                <p className="text-xs text-gray-500 mt-0.5">{editingId ? 'Update product details' : 'Add a new product to your catalog'}</p>
                            </div>
                            <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                                <FiX className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-5 overflow-y-auto">
                            <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Product name</label>
                                    <input 
                                        required 
                                        name="name" 
                                        value={form.name} 
                                        onChange={handleChange} 
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                                        placeholder="Product name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Price (NPR)</label>
                                        <input 
                                            required 
                                            type="number" 
                                            min="0" 
                                            step="0.01" 
                                            name="price" 
                                            value={form.price} 
                                            onChange={handleChange} 
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Stock</label>
                                        <input 
                                            required 
                                            type="number" 
                                            min="0" 
                                            name="stock" 
                                            value={form.stock} 
                                            onChange={handleChange} 
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                    <textarea 
                                        required 
                                        name="description" 
                                        value={form.description} 
                                        onChange={handleChange} 
                                        rows={3} 
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none" 
                                        placeholder="Product description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Product image</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-emerald-200 transition-colors">
                                        {imagePreview ? (
                                            <div className="relative w-24 h-24 mx-auto mb-2 rounded-lg overflow-hidden">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <FiImage className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                                        )}
                                        <label className="cursor-pointer">
                                            <span className="text-xs text-emerald-600 font-medium hover:text-emerald-700">
                                                Choose image
                                            </span>
                                            <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
                                        </label>
                                        <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2">
                            <button 
                                type="button" 
                                onClick={closeForm} 
                                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                form="productForm" 
                                className="px-4 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                {editingId ? 'Save' : 'Add product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}