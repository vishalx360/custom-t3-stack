"use client";

import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const Home: NextPage = () => {
    const { data: session, status } = useSession()

    async function handelSignin() {
        await signIn("google")
    }
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                        <Link
                            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                            href="https://create.t3.gg/en/usage/first-steps"
                            target="_blank"
                        >
                            <h3 className="text-2xl font-bold">First Steps →</h3>
                            <div className="text-lg">
                                Just the basics - Everything you need to know to set up your
                                database and authentication.
                            </div>
                        </Link>
                        <Link
                            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                            href="https://create.t3.gg/en/introduction"
                            target="_blank"
                        >
                            <h3 className="text-2xl font-bold">Documentation →</h3>
                            <div className="text-lg">
                                Learn more about Create T3 App, the libraries it uses, and how
                                to deploy it.
                            </div>
                        </Link>
                    </div>

                    <div className="">
                        {status === "unauthenticated"
                            &&
                            <button onClick={() => {
                                void handelSignin();
                            }
                            }
                                className="bg-neutral-50 rounded-xl text-black px-6 py-4 text-lg flex items-center gap-5 justify-center"
                            >
                                <FaGoogle />
                                Sign In With Google
                            </button>
                        }
                        {status === "authenticated" &&
                            <div className="">
                                <p className="p-2 my-5">Logged in as</p>

                                <div className="flex items-center gap-5">
                                    <Image height={200} width={200} src={session?.user?.image || "#"} alt="avatar" className="w-20 rounded-full" />
                                    <div>
                                        <h1 className="text-xl">{session.user.name}</h1>
                                        <h1 className="text-xl text-neutral-100 text-opacity-50">{session.user.email}</h1>
                                    </div>
                                </div>
                            </div>
                        }
                        {status === "loading" &&
                            <div>

                                <p className="p-2 my-5">Loading...</p>
                                <div className="flex justify-center
                            items-center gap-5">
                                    <div className="bg-neutral-100 animate-pulse rounded-full w-20 h-20" />
                                    <div className="w-52 space-y-3">
                                        <div className="bg-neutral-100 animate-pulse h-4 w-full rounded-xl" />
                                        <div className="bg-neutral-100 animate-pulse h-4 w-full rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
