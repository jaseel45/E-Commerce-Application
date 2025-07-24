import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-50 to-purple-300 relative overflow-hidden">

      {/* Top-right Login/Register */}
      <div className="absolute top-6 right-8 z-50 flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow hover:scale-105 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow hover:scale-105 transition"
        >
          Register
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative mb-20">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1600x600/?shopping,store')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-rose-700 drop-shadow mb-4"
          >
            Welcome to ShopEase
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-10">
            Discover top deals, trending gadgets, and fast doorstep delivery.
          </p>
          <Link
            to="/products"
            className="px-10 py-3 bg-gradient-to-r from-pink-600 to-red-500 hover:from-red-600 text-white rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
             Shop Now
          </Link>
        </div>
      </div>

      {/* Banner Images Grid */}
      <div className="max-w-6xl mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        <img
          src="https://res.cloudinary.com/dyy4gxz8v/image/upload/v1753372422/cosmetics_jz4lgi.jpg"
          alt="Cosmetics"
          className="rounded-xl shadow-md hover:shadow-lg transition duration-300"
        />
        <img
          src="https://res.cloudinary.com/dyy4gxz8v/image/upload/v1753372530/AdobeStock_1563837806_Preview_ar3fa7.jpg"
          alt="Skincare"
          className="rounded-xl shadow-md hover:shadow-lg transition duration-300"
        />
        <img
          src="https://res.cloudinary.com/dyy4gxz8v/image/upload/v1753372806/skincare_bn6zp4.png"
          alt="Beauty Products"
          className="rounded-xl shadow-md hover:shadow-lg transition duration-300"
        />
        <img
          src="https://res.cloudinary.com/dyy4gxz8v/image/upload/v1753374205/different-luxury-makeup-spa-beauty-products-skincare-beauty_uusvyk.png"
          alt="Fragrance"
          className="rounded-xl shadow-md hover:shadow-lg transition duration-300"
        />
        <img
          src="https://res.cloudinary.com/dyy4gxz8v/image/upload/v1753373572/istockphoto-1141698953-612x612_k1noji.jpg"
          alt="Lipstick"
          className="rounded-xl shadow-md hover:shadow-lg transition duration-300"
        />
        <img
          src="https://res.cloudinary.com/dyy4gxz8v/image/upload/v1753373995/set-care-cosmetics-colored-background_441923-2774_xe1ovp.avif"
          alt="Nail Polish"
          className="rounded-xl shadow-md hover:shadow-lg transition duration-300"
        />
      </div>

      {/* Promo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-rose-200 to-rose-100 text-center py-10 px-6 rounded-xl shadow-lg max-w-4xl mx-auto mb-16"
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-rose-700 mb-2">
          🎉 Exclusive Offer!
        </h3>
        <p className="text-gray-700 text-lg">
          Sign up now and get <span className="text-rose-600 font-bold">10% off</span> your first purchase.
          Hurry, limited time only!
        </p>
      </motion.div>
    </div>
  );
}

export default Home;
