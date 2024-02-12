import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layouts"));
const CardComponent = dynamic(() => import("@/components/card"));

export default function Profile({ user }) {
  const router = useRouter();
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
        console.log("User_toke=>", cookies);
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

  return (
    <LayoutComponent
      metaTitle="Profile"
      metaDescription="ini adalah halaman Profile Page"
      metaKeyword="Profile, DialogueTalk"
    >
      <div className="mt-2 py-4 bg-slate-50">
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
              <h1 className=" font-bold">50</h1>
              <h1 className=" -mt-1">Post</h1>
            </div>
            <div>
              <h1 className=" font-bold">50</h1>
              <h1 className=" -mt-1">Like</h1>
            </div>
            <div>
              <h1 className=" font-bold">50</h1>
              <h1 className=" -mt-1">Follower</h1>
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
      <div className="grid grid-cols-1 gap-4">
        <CardComponent
          name={"Johny"}
          date={"Thu Feb 08 2024"}
          post={
            "ertainly! Here are a few more libraries you might consider for creating avatars and frontend components in Reac"
          }
          like={2}
          comment={4}
          handleLike={handleLike}
          handleComment={handleComment}
          you={true}
        />

        <div className=" w-full text-center">
          <span className="loading loading-bars loading-lg "></span>
        </div>
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
  console.log("user=>", user);
  return { props: { user } };
}
