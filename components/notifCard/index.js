import React from "react";

const NotifCard = ({ name, comment = "", like = "" }) => {
  return (
    <div className=" flex justify-between items-center">
      <div
        className="flex justify-start items-center
           gap-2 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
        <div>
          <p className=" font-semibold">{name}</p>
          {like.length > 0 && (
            <p className=" -mt-0.5 text-xs text-slate-400">Like Your Post</p>
          )}
          {comment.length > 0 && (
            <p className=" -mt-0.5 text-xs text-slate-400">
              Comment: <span>{comment}</span>
            </p>
          )}
        </div>
      </div>
      <div>
        <button className=" btn btn-primary">Follow</button>
      </div>
    </div>
  );
};

export default NotifCard;
