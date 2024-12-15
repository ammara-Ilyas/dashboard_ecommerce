"use client";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contextApi/UserContext";
import Image from "next/image";

export default function NotificationPanel() {
  const { isOpen, setIsOpen } = useUser();

  const notifications = [
    {
      id: 1,
      user: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
    },
    {
      id: 2,
      user: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
    },
    {
      id: 3,
      user: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
    },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Notification Icon */}
      <button
        onClick={togglePanel}
        className="text-gray-600 hover:text-blue-500"
      >
        <NotificationsIcon fontSize="large" />
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 translate-y-full right-0 w-80 bg-white shadow-lg border rounded-lg overflow-hidden"
          >
            <div className="p-4 bg-blue-100 font-bold text-gray-800">
              Orders ({notifications.length})
            </div>
            <div className="max-h-64 overflow-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-2 p-4 border-b last:border-b-0 hover:bg-gray-100"
                >
                  {/* User Image */}
                  <Image
                    src="/user-placeholder.png" // Replace with user image path
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">{notification.user}</span>{" "}
                      {notification.action}
                    </p>
                    <p className="font-bold text-gray-800">
                      {notification.item}
                    </p>
                    <p className="text-xs text-gray-500">few seconds ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition">
              View All Notifications
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
