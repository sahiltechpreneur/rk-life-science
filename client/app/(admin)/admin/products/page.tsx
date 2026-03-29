"use client"

import { useEffect, useState, useContext } from "react"
import API from "@/lib/api"
import { FiEdit3, FiTrash2, FiPlus, FiSearch, FiX, FiImage, FiBox, FiDollarSign, FiAlignLeft, FiPackage, FiLoader } from "react-icons/fi"
import { AuthContext } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"

export default function ProductsPage() {
    const { user } = useContext(AuthContext)
    const { showNotification } = useNotification()

    const [products, setProducts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        composition: "",
        packing: "",
        ingredients: "",
        advantages: "",
        content: "",
    })

    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    useEffect(() => {
        fetchProducts()
    }, [search, page])

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await API.get(`/products?search=${search}&page=${page}&limit=8`)
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

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const newImages = [...images, ...files].slice(0, 6)
            setImages(newImages)

            const newPreviews: string[] = []
            newImages.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string)
                    if (newPreviews.length === newImages.length) {
                        setImagePreviews(newPreviews)
                    }
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        const newPreviews = imagePreviews.filter((_, i) => i !== index)
        setImages(newImages)
        setImagePreviews(newPreviews)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData()

        data.append("name", form.name)
        data.append("description", form.description)
        data.append("price", form.price)
        data.append("stock", form.stock)
        data.append("composition", form.composition)
        data.append("packing", form.packing)
        data.append("ingredients", form.ingredients)
        data.append("advantages", form.advantages)
        data.append("content", form.content)

        images.forEach((img) => {
            data.append("images", img)
        })

        if (!user?.token) {
            showNotification("Your session has expired. Please login again.", "error")
            return
        }

        setIsSaving(true)
        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    // Axios will set multipart header automatically
                }
            }

            if (editingId) {
                await API.put(`/products/${editingId}`, data, config)
                showNotification("Product updated successfully!", "success")
            } else {
                await API.post("/products", data, config)
                showNotification("Product added successfully!", "success")
            }
            closeForm()
            fetchProducts()
        } catch (error: any) {
            console.error("Failed to save product", error)
            const errMsg = error.response?.data?.error || "Failed to save product. Please try again."
            showNotification(errMsg, "error")
        } finally {
            setIsSaving(false)
        }
    }

    const deleteProduct = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return
        try {
            await API.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            })
            showNotification("Product deleted", "success")
            fetchProducts()
        } catch (error: any) {
            console.error("Failed to delete product", error)
            showNotification(error.response?.data?.error || "Delete failed", "error")
        }
    }

    const editProduct = (p: any) => {
        setEditingId(p.id)
        setForm({
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
            composition: p.composition || "",
            packing: p.packing || "",
            ingredients: p.ingredients || "",
            advantages: p.advantages || "",
            content: p.content || "",
        })
        
        // Handle existing images
        const existingImages = p.images || (p.image ? [p.image] : [])
        const previews = existingImages.map((img: string) => 
            img.startsWith("http") ? img : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${img}`
        )
        setImagePreviews(previews)
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setForm({ 
            name: "", description: "", price: "", stock: "", 
            composition: "", packing: "", ingredients: "", advantages: "", content: "" 
        })
        setImages([])
        setImagePreviews([])
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
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
                        
                        {/* Modal Form */}
                        <form id="productForm" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            {/* Modal Body */}
                            <div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">
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
                                        rows={2} 
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none" 
                                        placeholder="Brief description"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Composition</label>
                                        <input name="composition" value={form.composition} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="e.g. Paracetamol 500mg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Packing</label>
                                        <input name="packing" value={form.packing} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="e.g. 10x10 Tablets" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Ingredients / Advantages / Content</label>
                                    <textarea name="ingredients" value={form.ingredients} onChange={handleChange} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 mb-2" placeholder="Ingredients..." />
                                    <textarea name="advantages" value={form.advantages} onChange={handleChange} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 mb-2" placeholder="Advantages..." />
                                    <textarea name="content" value={form.content} onChange={handleChange} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Other content..." />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Product images (Up to 6)</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center hover:border-emerald-200 transition-colors">
                                        <div className="flex flex-wrap gap-2 mb-2 justify-center">
                                            {imagePreviews.map((preview, idx) => (
                                                <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-100 group">
                                                    <img src={preview} alt="" className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <FiX className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            {imagePreviews.length < 6 && (
                                                <label className="w-16 h-16 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 bg-white">
                                                    <FiPlus className="w-4 h-4 text-gray-400" />
                                                    <input type="file" className="hidden" onChange={handleImages} accept="image/*" multiple />
                                                </label>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-400">Add up to 6 high-quality product photos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/50">
                                <button 
                                    type="button" 
                                    onClick={closeForm} 
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className="px-6 py-2 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <FiLoader className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        editingId ? 'Save Changes' : 'Add Product'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}