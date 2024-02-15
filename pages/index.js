import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";

import { formatRelative } from "date-fns";
import { useStore } from "@/store";
import Swal from "sweetalert2";

const LayoutComponent = dynamic(() => import("@/layouts"));
const CardComponent = dynamic(() => import("@/components/card"));

export default function Home() {
  const { editId } = useStore();
  const [modal, setModal] = useState();
  const { mutate } = useMutation();
  const [postForm, setPostForm] = useState("");
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataReplies, setDataReplies] = useState([]);

  const handleLike = async (idPost, isLike) => {
    if (isLike) {
      const res = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${idPost}`,
        method: "POST",
        auth: Cookies.get("user_token"),
      });
      if (res?.success) {
        fetchPost();
      }
    } else {
      const res = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${idPost}`,
        method: "POST",
        auth: Cookies.get("user_token"),
      });
      if (res?.success) {
        fetchPost();
      }
    }
  };
  const handleComment = async (idPost) => {
    const response = await fetch(
      `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${idPost}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
      }
    );
    const data = await response.json();
    setDataReplies(data?.data);
  };
  const handleSaveReplies = async (idPost) => {
    const data = { description: postForm };
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${idPost}`,
      method: "POST",
      payload: data,
      auth: Cookies.get("user_token"),
    });
    if (res?.success) {
      Swal.fire({
        title: "Replies Successfully!",
        icon: "success",
      });
      fetchPost();
      handleComment(idPost);
    }
    setPostForm("");
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
    setPostForm("");
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
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
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
  const handleDeletePost = async (id) => {
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
  useEffect(() => {
    if (editId !== 0) {
      dataPostById();
    }
    fetchPost();
  }, [editId]);

  return (
    <LayoutComponent
      metaTitle="Home"
      metaDescription="ini adalah halaman Home Page"
      metaKeyword="Home, DialogueTalk"
    >
      <div className="grid grid-cols-1 gap-4 mt-4 mb-16">
        {isLoading && (
          <div className=" w-full text-center">
            <span className="loading loading-bars loading-lg "></span>
          </div>
        )}
        {postData.map((post) => (
          <CardComponent
            key={post.id}
            id={post.id}
            name={post.user.name}
            date={formatRelative(new Date(post.created_at), new Date())}
            post={post.description}
            like={post.likes_count}
            comment={post.replies_count}
            handleLike={() => handleLike(post.id, post.is_like_post)}
            handleComment={() => handleComment(post.id)}
            dataReplies={dataReplies}
            isOwnPost={post.is_own_post}
            isLikePost={post.is_like_post}
            onChangeEdit={(e) => setPostForm(e.target.value)}
            valueEdit={postForm}
            handleSaveEdit={handleSaveEdit}
            handleDeletePost={handleDeletePost}
            modalBy={"index_home"}
            valueReplies={postForm}
            handleSaveReplies={() => handleSaveReplies(post.id)}
            onChangeReplies={(e) => setPostForm(e.target.value)}
          />
        ))}
      </div>
    </LayoutComponent>
  );
}
