import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { formatRelative } from "date-fns";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layouts"));
const CardComponent = dynamic(() => import("@/components/card"));

export default function Profile({ user }) {
  const [postForm, setPostForm] = useState("");
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { editId } = useStore();
  const router = useRouter();
  const { mutate } = useMutation();
  const { data } = user;

  const handleLike = () => {
    console.log("LIKE");
  };
  const handleComment = () => {
    console.log("Comment");
  };
  const handleLogout = () => {
    Swal.fire({
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const cookies = Cookies.get();
        try {
          await fetch("https://paace-f178cafcae7b.nevacloud.io/api/logout", {
            headers: {
              Authorization: `Bearer ${cookies.user_token}`,
            },
          });
          Cookies.remove("user_token");
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out.",
            icon: "success",
          });

          router.push("/");
        } catch (error) {
          Swal.fire({
            title: "Logged Out!",
            text: "Logged out failure.",
            icon: "warning",
          });
        }
      }
    });
  };
  const dataPostById = async () => {
    const response = await fetch(
      `https://paace-f178cafcae7b.nevacloud.io/api/post/${editId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
      }
    );
    const data = await response.json();
    setPostForm(data?.data.description);
  };
  const handleSaveEdit = async () => {
    const data = { description: postForm };
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${editId}`,
      method: "PATCH",
      payload: data,
      auth: Cookies.get("user_token"),
    });
    if (res?.success) {
      Swal.fire({
        title: "Update Successfully!",
        icon: "success",
      });
      fetchPost();
    }
  };
  const handleDeletePost = async (id) => {
    console.log("DELETE");
    Swal.fire({
      text: "Are you sure you want to Delete this Post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(
            `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${Cookies.get("user_token")}`,
              },
            }
          );
          Swal.fire({
            title: "Post deleted!",
            text: "You have been successfully deleted post.",
            icon: "success",
          });
        } catch (error) {
          console.log("Err=>", error);
          Swal.fire({
            title: "Logged Out!",
            text: "Logged out failure.",
            icon: "warning",
          });
        }
        fetchPost();
      }
    });
  };
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=me",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
        }
      );
      const data = await response.json();
      setPostData(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Errr->", error);
    }
  };
  useEffect(() => {
    if (editId !== 0) {
      dataPostById();
    }
    fetchPost();
  }, [editId]);
  const totalLikes = postData.reduce(
    (total, item) => total + item.likes_count,
    0
  );
  const totalReplies = postData.reduce(
    (total, item) => total + item.replies_count,
    0
  );

  return (
    <LayoutComponent
      metaTitle="Profile"
      metaDescription="ini adalah halaman Profile Page"
      metaKeyword="Profile, DialogueTalk"
    >
      <div className="mt-2 py-4 ">
        <div className=" flex gap-4 justify-around items-center  py-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
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
            <h1 className="mt-1 text-lg">{data.name}</h1>
            <p className=" -mt-1 text-sm text-slate-400">{data.email}</p>
          </div>
          <div className=" flex gap-4 text-center">
            <div>
              <h1 className=" font-bold">{postData.length}</h1>
              <h1 className=" -mt-1">Post</h1>
            </div>
            <div>
              <h1 className=" font-bold">{totalLikes}</h1>
              <h1 className=" -mt-1">Like</h1>
            </div>
            <div>
              <h1 className=" font-bold">{totalReplies}</h1>
              <h1 className=" -mt-1">Replies</h1>
            </div>
          </div>
        </div>
        <div className=" text-end mr-6">
          <p
            className=" text-sm text-red-700 font-semibold hover:text-red-800 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {postData.map((post) => (
          <CardComponent
            key={post.id}
            id={post.id}
            name={post.user.name}
            date={formatRelative(new Date(post.created_at), new Date())}
            post={post.description}
            like={post.likes_count}
            comment={post.replies_count}
            handleLike={handleLike}
            handleComment={handleComment}
            modalBy={"profile"}
            isOwnPost={post.is_own_post}
            isLikePost={post.is_like_post}
            onChange={(e) => setPostForm(e.target.value)}
            value={postForm}
            handleSave={handleSaveEdit}
            handleDeletePost={handleDeletePost}
          />
        ))}
        {isLoading && (
          <div className=" w-full text-center">
            <span className="loading loading-bars loading-lg "></span>
          </div>
        )}
      </div>
    </LayoutComponent>
  );
}
export async function getServerSideProps(context) {
  // Fetch data from external API
  const response = await fetch(
    "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    {
      headers: { Authorization: `Bearer ${context.req.cookies.user_token}` },
    }
  );
  const user = await response.json();
  // Pass data to the page via props
  return { props: { user } };
}
