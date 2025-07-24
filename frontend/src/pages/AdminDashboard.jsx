// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  LogOut,
  Eye,
  EyeOff,
  Package,
  Users,
  ShoppingBag,
  UserCircle,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api/axiosConfig";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const [admin, setAdmin] = useState({ name: "", email: "", role: "admin" });
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const handleLogout = async () => {
    try {
      await API.post("/api/admin/logout");
      document.cookie = "token=; Max-Age=0";
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/admin/profile");
      setAdmin(res.data);
      setFormData({ name: res.data.name, email: res.data.email, password: "" });
    } catch (err) {
      toast.error("Failed to load admin data");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setDeletingUserId(id);
      await API.delete(`/api/admin/users/${id}`);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    if (activeTab === "editProfile") fetchProfile();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "products") fetchProducts();
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password } = formData;
      const payload = { name, email };
      if (password) payload.password = password;

      const res = await API.put("/api/admin/profile", payload);
      setAdmin(res.data);
      toast.success("Profile updated!");
      setMessage("Profile updated successfully");
    } catch (err) {
      toast.error("Profile update failed");
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ToastContainer />

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-8 text-center">Admin Panel</h1>
          <nav className="space-y-3">
            {[
              { key: "home", label: "Dashboard Home", icon: UserCircle },
              { key: "users", label: "All Users", icon: Users },
              { key: "orders", label: "All Orders", icon: ShoppingBag },
              { key: "products", label: "Manage Products", icon: Package },
              { key: "editProfile", label: "Edit Profile", icon: Eye },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-left ${
                  activeTab === key
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:underline mt-10"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "home" && (
          <section>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome, Admin</h2>
            <p className="text-gray-600">Use the sidebar to manage users, orders, and products.</p>
          </section>
        )}

        {activeTab === "users" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Registered Users</h2>
            {users.length === 0 ? (
              <p className="text-gray-500">No users found or still loading...</p>
            ) : (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between items-center border p-3 rounded bg-white shadow-sm"
                  >
                    <div>
                      <strong>{user.name}</strong> – {user.email}
                      <span className="ml-2 text-sm text-gray-500">({user.role})</span>
                    </div>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        disabled={deletingUserId === user._id}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "orders" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found or still loading...</p>
            ) : (
              <ul className="space-y-2">
                {orders.map((order) => (
                  <li key={order._id} className="border p-3 rounded bg-white shadow-sm">
                    Order ID: {order._id} – Total: ₹{order.totalPrice} – Status: {order.status}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "products" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Products</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">No products found or still loading...</p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <li key={product._id} className="border p-3 rounded bg-white shadow-sm">
                    <strong>{product.name}</strong> – ₹{product.price}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "editProfile" && (
          <section className="max-w-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Admin Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border rounded px-3 py-2 mt-1 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={admin?.role || "admin"}
                  readOnly
                  className="w-full bg-gray-100 text-gray-600 border rounded px-3 py-2 mt-1"
                />
              </div>

              {message && (
                <p
                  className={`text-sm ${
                    message.includes("success") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
