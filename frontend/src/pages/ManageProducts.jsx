// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// import { Button } from '../components/Button';
// import { Card } from '../components/card';
// import { Table } from '../components/Table';
// import { Input } from '../components/Input';
// import { Label } from '../components/Label';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '../components/dialog';


// function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     images: [''],
//   });

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get('/api/products');
//       setProducts(data);
//     } catch (error) {
//       toast.error('Failed to fetch products');
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleOpen = (product = null) => {
//     setEditingProduct(product);
//     setFormData(
//       product || {
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         stock: '',
//         images: [''],
//       }
//     );
//     setOpenModal(true);
//   };

//   const handleClose = () => {
//     setOpenModal(false);
//     setEditingProduct(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'price' || name === 'stock' ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingProduct) {
//         await axios.put(`/api/products/${editingProduct._id}`, formData);
//         toast.success('Product updated');
//       } else {
//         await axios.post('/api/products', formData);
//         toast.success('Product created');
//       }
//       fetchProducts();
//       handleClose();
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to save product');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure to delete this product?')) {
//       try {
//         await axios.delete(`/api/products/${id}`);
//         toast.success('Product deleted');
//         fetchProducts();
//       } catch (err) {
//         toast.error('Delete failed');
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Manage Products</h2>
//         <Button onClick={() => handleOpen()}>Add Product</Button>
//       </div>

//       <Card className="p-4 overflow-x-auto">
//         <Table>
//           <thead>
//             <tr className="border-b font-semibold">
//               <th>Name</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Category</th>
//               <th>Seller</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p._id} className="border-b">
//                 <td>{p.name}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.stock}</td>
//                 <td>{p.category}</td>
//                 <td>{p.seller?.name || 'N/A'}</td>
//                 <td className="space-x-2">
//                   <Button size="sm" onClick={() => handleOpen(p)}>Edit</Button>
//                   <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>Delete</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>

//       <Dialog open={openModal} onOpenChange={handleClose}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
//           </DialogHeader>

//           <div className="grid gap-4 py-4">
//             <div>
//               <Label>Name</Label>
//               <Input name="name" value={formData.name} onChange={handleChange} />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input name="description" value={formData.description} onChange={handleChange} />
//             </div>
//             <div>
//               <Label>Price</Label>
//               <Input name="price" type="number" value={formData.price} onChange={handleChange} />
//             </div>
//             <div>
//               <Label>Stock</Label>
//               <Input name="stock" type="number" value={formData.stock} onChange={handleChange} />
//             </div>
//             <div>
//               <Label>Category</Label>
//               <Input name="category" value={formData.category} onChange={handleChange} />
//             </div>
//             <div>
//               <Label>Image URL</Label>
//               <Input name="images" value={formData.images[0]} onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, images: [e.target.value] }))
//               } />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={handleSubmit}>{editingProduct ? 'Update' : 'Create'}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default ManageProducts;
