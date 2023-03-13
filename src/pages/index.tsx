import { type NextPage } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { authOptions } from "~/server/auth";

type Props = { status: "authenticated" | "unauthenticated" }

const HomePage: NextPage<Props> = ({ status }: Props) => {

  async function handelSignin() {
    await signIn("google");
  }
  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-teal-900 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl sm:text-[5rem] font-extrabold tracking-tight text-white">
            Custom T3 Stack
          </h1>
          <h1 className="text-3xl sm:text-[3rem] font-extrabold tracking-tight text-white">
            Template
          </h1>
          <a target="_blank" href="https://github.com/vishalx360" className="text-xl font-extrabold underline text-white">
            @vishalx360
          </a>
          <div className=" bg-teal-800/10 p-5 rounded-xl border-2 border-teal-800">

            <h1 className="text-xl font-bold text-white my-2 ">With some key differences</h1>
            <li className="text-white ">Next Auth : JWT Strategy </li>
            <li className="text-white ">Google OAuth Default</li>
            <li className="text-white ">Protected Routes Using Middleware</li>
          </div>
          <div className="">
            {status === "unauthenticated" && (
              <button
                onClick={() => {
                  void handelSignin();
                }}
                className="flex items-center justify-center gap-5 rounded-xl bg-neutral-50 px-6 py-4 text-lg text-black"
              >
                <FaGoogle />
                Sign In With Google
              </button>
            )}
            {status === "authenticated" && (
              <div className="text-center">
                <Link className="px-4 py-2 bg-white text-black rounded-xl" href="/dashboard">
                  Visit Dashboard
                </Link>
              </div>
            )}
            {/* {status === "loading" && (
              <div>
                <p className="my-5 p-2">Loading...</p>
                <div
                  className="flex items-center
                            justify-center gap-5"
                >
                  <div className="h-20 w-20 animate-pulse rounded-full bg-neutral-100" />
                  <div className="w-52 space-y-3">
                    <div className="h-4 w-full animate-pulse rounded-xl bg-neutral-100" />
                    <div className="h-4 w-full animate-pulse rounded-xl bg-neutral-100" />
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  return {
    props: {
      status: session ? "authenticated" : "unauthenticated",
    },
  }
}