// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setMessage('Failed to load product.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId: id, quantity: Number(quantity) },
        { withCredentials: true }
      );
      setMessage(' Added to cart!');
    } catch (err) {
      setMessage(' Add to cart failed.');
    }
  };

  if (!product) {
    return <div className="text-center mt-10 text-gray-600">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Image Carousel */}
        <div className="flex-1">
          <img
            src={product.images[activeImgIndex]}
            alt="product"
            className="w-full h-96 object-cover rounded shadow"
          />
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`img-${index}`}
                className={`w-20 h-20 object-cover rounded border-2 cursor-pointer ${
                  activeImgIndex === index ? 'border-rose-500' : 'border-gray-300'
                }`}
                onClick={() => setActiveImgIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-rose-700 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl text-rose-600 font-semibold">₹{product.price}</p>
          <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>

          <div className="flex items-center mb-4">
            <label className="mr-2">Qty:</label>
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 p-1 border rounded"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
          >
            🛒 Add to Cart
          </button>

          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
