"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { FiEdit3, FiTrash2, FiPlus, FiSearch, FiX, FiImage, FiBox, FiDollarSign, FiAlignLeft } from "react-icons/fi"

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
            setError(error.response?.data?.error || "Failed to fetch products. Please try again.")
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
        if (!confirm("Are you sure you want to delete this product?")) return
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
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[85vh] bg-transparent">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900">
                        Products
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 ml-2">
                            Overview
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm font-medium">Manage your inventory beautifully</p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-emerald-500 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                    <FiPlus className="w-5 h-5 mr-2" />
                    New Product
                </button>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center mb-8 hover:shadow-md transition-shadow duration-300">
                <FiSearch className="text-gray-400 w-5 h-5 ml-2" />
                <input 
                    placeholder="Search by product name..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 px-4 py-2 text-sm sm:text-base outline-none" 
                />
            </div>
            {error && (
                <div className="mb-8 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex justify-between items-center">
                    <p className="font-medium">{error}</p>
                    <button onClick={fetchProducts} className="text-sm font-bold underline">Retry</button>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                     [...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-3xl p-4 h-[350px] border border-gray-100 shadow-sm flex flex-col">
                            <div className="w-full h-48 bg-gray-100 rounded-2xl mb-4"></div>
                            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3"></div>
                            <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2 mb-auto"></div>
                            <div className="flex justify-between mt-4">
                                <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))
                ) : products.length > 0 ? (
                    products.map((p: any) => (
                        <div key={p.id} className="group bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1 relative overflow-hidden text-left">
                            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                <button onClick={() => editProduct(p)} className="bg-white/95 backdrop-blur-md p-2 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm transition-colors cursor-pointer z-20">
                                    <FiEdit3 className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteProduct(p.id)} className="bg-white/95 backdrop-blur-md p-2 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition-colors cursor-pointer z-20">
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="relative h-56 mb-5 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center group-hover:shadow-inner transition-shadow">
                                {p.image ? (
                                    <img 
                                        src={p.image.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`} 
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        alt={p.name} 
                                    />
                                ) : (
                                    <FiBox className="w-12 h-12 text-gray-300" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                            </div>
                            
                            <div className="flex-1 px-2">
                                <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-1 group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px] mb-4">{p.description}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto pt-4 px-2 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price (NPR)</span>
                                    <span className="font-black text-gray-900">NPR {Number(p.price).toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Stock</span>
                                    <span className={`font-bold ${p.stock > 10 ? 'text-emerald-600' : p.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                                        {p.stock} units
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-100 border-dashed">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                            <FiSearch className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500 max-w-sm">We couldn't find any products matching your search. Try adjusting your filters or add a new product.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {products.length > 0 && (
                <div className="flex justify-center items-center mt-12 gap-3">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        disabled={page === 1} 
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    > 
                        Previous 
                    </button>
                    <div className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold shadow-md shadow-gray-900/20">
                        {page}
                    </div>
                    <button 
                        onClick={() => setPage(p => p + 1)} 
                        disabled={products.length < 6}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    > 
                        Next 
                    </button>
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-gray-900/5">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">{editingId ? 'Edit Product' : 'Create Product'}</h2>
                                <p className="text-sm text-gray-500 mt-1 font-medium">{editingId ? 'Update product details below' : 'Add a new product to your catalog'}</p>
                            </div>
                            <button onClick={closeForm} className="p-2.5 rounded-full hover:bg-gray-100 transition-colors bg-gray-50 text-gray-500 hover:text-gray-900">
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 col-span-1 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><FiBox className="text-emerald-500" /> Product Name</label>
                                        <input required name="name" value={form.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium placeholder:text-gray-400" placeholder="E.g. Advanced Microscope..." />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><FiDollarSign className="text-emerald-500" /> Price (NPR)</label>
                                        <input required type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium placeholder:text-gray-400" placeholder="0.00" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><FiBox className="text-emerald-500" /> Stock Quantity</label>
                                        <input required type="number" min="0" name="stock" value={form.stock} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium placeholder:text-gray-400" placeholder="0" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><FiAlignLeft className="text-emerald-500" /> Description</label>
                                    <textarea required name="description" value={form.description} onChange={handleChange} rows={4} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none font-medium placeholder:text-gray-400" placeholder="Describe the product features and specifications..."></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><FiImage className="text-emerald-500" /> Product Image</label>
                                    <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-gray-200 px-6 py-8 bg-gray-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors group relative overflow-hidden">
                                        <div className="text-center z-10 w-full">
                                            {imagePreview ? (
                                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:text-emerald-500 transition-colors">
                                                    <FiImage className="h-5 w-5" aria-hidden="true" />
                                                </div>
                                            )}
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-emerald-600 focus-within:outline-none hover:text-emerald-700">
                                                    <span>Upload an image</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImage} accept="image/*" />
                                                </label>
                                                <p className="pl-1 font-medium text-gray-500">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2 font-medium">PNG, JPG, WEBP up to 5MB</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3 mt-auto">
                            <button type="button" onClick={closeForm} className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-colors">
                                Cancel
                            </button>
                            <button type="submit" form="productForm" className="px-8 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg shadow-gray-900/20 active:scale-95">
                                {editingId ? 'Save Improvements' : 'Publish Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}