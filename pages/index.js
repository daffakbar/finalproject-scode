import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import { format, formatDistance, formatRelative } from "date-fns";
import { useStore } from "@/store";
import Swal from "sweetalert2";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
const LayoutComponent = dynamic(() => import("@/layouts"));
const CardComponent = dynamic(() => import("@/components/card"));

export default function Home() {
  const { editId } = useStore();
  const [modal, setModal] = useState();
  const { mutate } = useMutation();
  const [postForm, setPostForm] = useState("");
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = () => {
    console.log("LIKE");
  };
  const handleComment = () => {
    console.log("Comment");
    setModal("replies");
  };
  const handleSaveEdit = async () => {
    console.log("Comment");
    // https://paace-f178cafcae7b.nevacloud.io/api/post/update/2
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
    console.log("Ress=>", res);
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
            handleLike={handleLike}
            handleComment={handleComment}
            modal={modal}
            isOwnPost={post.is_own_post}
            isLikePost={post.is_like_post}
            onChange={(e) => setPostForm(e.target.value)}
            value={postForm}
            handleSave={handleSaveEdit}
          />
        ))}
      </div>
    </LayoutComponent>
  );
}
