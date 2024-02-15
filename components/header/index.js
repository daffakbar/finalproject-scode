import React, { useState } from "react";
import NotifCard from "../notifCard";
import Cookies from "js-cookie";
import { formatRelative } from "date-fns";

const Header = () => {
  const [allNotif, setAllNotif] = useState([]);
  const handleNotification = async () => {
    const response = await fetch(
      "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
      }
    );
    const data = await response.json();

    setAllNotif(data?.data);
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DialogueTalk</a>
        </div>
        <div className="flex-none ">
          <label
            className="btn btn-ghost btn-circle shadow-md "
            htmlFor="my_modal_7"
          >
            <div className="indicator ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </label>
        </div>
      </div>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        onClick={handleNotification}
      />
      {/* MODAL */}
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">Notification</h3>
          <div className=" grid grid-cols-1 gap-4">
            {/* Notif Card */}
            {allNotif.map((notif) => (
              <NotifCard
                name={notif.user.name}
                remark={notif.remark}
                post={notif.posts.description}
                date={formatRelative(new Date(notif.created_at), new Date())}
              />
            ))}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default Header;
