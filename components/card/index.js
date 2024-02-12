import React, { useState } from "react";
import Form from "../form";
import { useStore } from "@/store";
const Card = ({
  id,
  name,
  date,
  post,
  like,
  comment,
  handleLike,
  handleComment,
  you = false,
  value,
  handleSave,
  key,
  isOwnPost,
  isLikePost,
  onChange,
}) => {
  const [modal, setModal] = useState("");
  const { handleGetEditId } = useStore();

  return (
    <>
      <div className=" shadow-md border  mx-4 rounded-xl p-3" key={key}>
        <div className=" flex justify-between items-center">
          <div
            className="flex justify-start items-center
           gap-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
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
              <p className=" font-semibold">{you ? "Anda" : name}</p>
              <p className=" -mt-0.5 text-xs text-slate-400">{date}</p>
            </div>
          </div>
          <div>
            {isOwnPost && (
              <div className="dropdown dropdown-bottom dropdown-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                  tabIndex={0}
                  role="button"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-1 shadow bg-base-100 w-14"
                >
                  <li>
                    <label
                      htmlFor="my_modal_8"
                      onClick={() => {
                        setModal("Edit");
                        handleGetEditId(id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </label>
                  </li>
                  <li>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className=" mt-3 leading-5 text-justify ">{post}</p>
        <div className=" mt-2 flex justify-around text-center">
          <button
            className="hover:bg-slate-200 w-full rounded-md flex justify-center items-center gap-2 py-1"
            onClick={handleLike}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            </span>
            {like} Like
          </button>
          <label
            htmlFor="my_modal_8"
            className="hover:bg-slate-200 w-full rounded-md flex justify-center items-center gap-2 py-1"
            onClick={() => {
              handleComment;
              setModal("Replies");
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chat-right"
                viewBox="0 0 16 16"
              >
                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
              </svg>
            </span>
            {comment} Comment
          </label>
        </div>
      </div>
      {/* MODAL */}

      <input type="checkbox" id="my_modal_8" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{modal} Post</h3>
          <Form value={value} handleSave={handleSave} onChange={onChange} />
          {modal === "Replies" && (
            <>
              <hr className=" border my-2" />
              <div>
                <div className=" flex justify-between items-center">
                  <div
                    className="flex justify-start items-center
           gap-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
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
                      <p className=" font-semibold">{you ? "Anda" : name}</p>
                      <p className=" -mt-0.5 text-xs text-slate-400">{date}</p>
                    </div>
                  </div>
                </div>
                <div className=" mt-1">
                  <p>Here are a few more libraries</p>
                </div>
              </div>
            </>
          )}
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_8">
          Close
        </label>
      </div>
    </>
  );
};

export default Card;
