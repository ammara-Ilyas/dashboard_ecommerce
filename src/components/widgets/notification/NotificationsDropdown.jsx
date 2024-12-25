"use client";
import React from "react";
import { useUser } from "@/contextApi/UserContext";
import { Avatar } from "@mui/material";
const NotificationsDropdown = () => {
  const { notifications, isOpen, togglePanel } = useUser();

  return (
    <>
      {isOpen && (
        <div className="absolute overflow-hidden right-[18%] top-16 border bg-white shadow-md rounded-lg w-80 transition-transform duration-300 transform translate-y-0 z-40">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Orders ({notifications.length})
            </h3>
          </div>
          <div className="max-h-[350px] overflow-y-auto bg-gray-50">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <Avatar
                  src={notification.avatar}
                  className="border-2 border-blue-700"
                  sx={{ width: 50, height: 50 }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-semibold">
                      {notification.user}&nbsp;
                    </span>
                    <span>{notification.action}&nbsp;</span>
                    <span className="font-semibold">
                      {notification.item}&nbsp;
                    </span>
                  </p>
                  <p className="text-xs text-blue-600">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" p-2 flex justify-center ">
            <button
              className="text-white bg-blue-600 p-2 w-[90%] mx-auto rounded-lg "
              onClick={togglePanel}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsDropdown;
