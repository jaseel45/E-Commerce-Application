// src/pages/UserDashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdPerson, MdStore } from "react-icons/md";
import ProfileEditor from "../components/ProfileEditor";
import API from "../api/axiosConfig";

function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("products");
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await API.get("/api/users/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user profile.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/api/users/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  const navItems = [
    {
      label: "Browse Products",
      icon: <MdStore />,
      key: "products",
      action: () => {
        if (location.pathname !== "/products") {
          navigate("/products");
        }
        setShowProfile(false);
      },
    },
    {
      label: "View Orders",
      icon: <FaBoxOpen />,
      key: "orders",
      action: () => {
        setShowProfile(false);
        navigate("/user-orders");  
      },
    },
    {
      label: "View Cart",
      icon: <FaShoppingCart />,
      key: "cart",
      action: () => {
        if (location.pathname !== "/cart") {
          navigate("/cart");
        }
        setShowProfile(false);
      },
    },
    {
      label: "Edit Profile",
      icon: <MdPerson />,
      key: "profile",
      action: () => {
        setShowProfile(true);
      },
    },
    {
      label: "Logout",
      icon: <FaSignOutAlt />,
      key: "logout",
      action: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen flex bg-pink-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <div className="text-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=FFC0CB&color=fff`}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full mb-2"
          />
          <h2 className="text-lg font-semibold text-rose-600">
            {user?.username || "User"}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key);
              item.action();
            }}
            className={`flex items-center gap-3 px-4 py-2 my-1 rounded transition text-left ${
              activeTab === item.key
                ? "bg-rose-100 text-rose-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-rose-600 mb-4">User Dashboard</h1>
        <p className="text-gray-700">
          Welcome! Use the sidebar to manage your profile, browse products, check your cart, or view past orders.
        </p>

        {showProfile && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-rose-500 mb-2">Edit Profile</h2>
            <ProfileEditor />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;









// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaBoxOpen,
//   FaShoppingCart,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { MdPerson, MdStore } from "react-icons/md";
// import ProfileEditor from "../components/ProfileEditor";

// function UserDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("products");
//   const [user, setUser] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("/api/users/profile", {
//         withCredentials: true,
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error("Failed to load user profile.");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("/api/users/logout", {}, { withCredentials: true });
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//       alert("Logout failed. Please try again.");
//     }
//   };

//   const navItems = [
//     { label: "Browse Products", icon: <MdStore />, key: "products", action: () => navigate("/products") },
//     { label: "View Orders", icon: <FaBoxOpen />, key: "orders", action: () => navigate("/user-orders") },
//     { label: "View Cart", icon: <FaShoppingCart />, key: "cart", action: () => navigate("/cart") },
//     { label: "Edit Profile", icon: <MdPerson />, key: "profile", action: () => setShowProfile(true) },
//     { label: "Logout", icon: <FaSignOutAlt />, key: "logout", action: handleLogout },
//   ];

//   return (
//     <div className="min-h-screen flex bg-pink-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
//         {/* Profile Info */}
//         <div className="text-center mb-6">
//           <img
//             src="https://via.placeholder.com/100"
//             alt="Profile"
//             className="w-24 h-24 mx-auto rounded-full mb-2"
//           />
//           <h2 className="text-lg font-semibold text-rose-600">
//             {user?.username || "User"}
//           </h2>
//           <p className="text-sm text-gray-500">{user?.email}</p>
//         </div>

//         {/* Navigation */}
//         {navItems.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => {
//               setActiveTab(item.key);
//               item.action();
//             }}
//             className={`flex items-center gap-3 px-4 py-2 my-1 rounded transition text-left ${
//               activeTab === item.key
//                 ? "bg-rose-100 text-rose-600 font-medium"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {item.icon}
//             {item.label}
//           </button>
//         ))}
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold text-rose-600 mb-4">User Dashboard</h1>
//         <p className="text-gray-700">
//           Welcome! Use the sidebar to manage your profile, browse products, check your cart, or view past orders.
//         </p>

//         {showProfile && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold text-rose-500 mb-2">Edit Profile</h2>
//             <ProfileEditor />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;

