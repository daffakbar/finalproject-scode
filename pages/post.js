import dynamic from "next/dynamic";
import Form from "@/components/form";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layouts"));

const Post = () => {
  const [description, setDescription] = useState("");
  const { mutate } = useMutation();
  const router = useRouter();
  const handlePost = async () => {
    try {
      const res = await mutate({
        url: "https://paace-f178cafcae7b.nevacloud.io/api/post",
        method: "POST",
        auth: Cookies.get("user_token"),
        payload: { description: description },
      });

      if (res?.data) {
        Swal.fire({
          title: "Post Successful",
          icon: "success",
        });
        router.push("/");
      } else {
        Swal.fire({
          title: "Post Failure",
          icon: "warning",
        });
      }
    } catch (error) {
      console.log("err=>", error);
      Swal.fire({
        title: error,
        icon: "warning",
      });
    }
  };
  return (
    <LayoutComponent
      metaTitle="Post"
      metaDescription="ini adalah halaman Post Page"
      metaKeyword="Post, DialogueTalk"
    >
      <Form
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        handleSave={handlePost}
      />
    </LayoutComponent>
  );
};

export default Post;
