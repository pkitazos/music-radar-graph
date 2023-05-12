import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { SideMenu } from "~/components";

const Profile: NextPage = () => {
  let { data: session } = useSession();
  let user = session?.user;

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <h1 className="font-mono text-4xl font-semibold text-secondary">
            welcome
          </h1>
          <h1 className="font-mono text-4xl font-semibold text-primary">
            {user?.name}
          </h1>

          {user ? (
            <button className="btn mt-6" onClick={() => signOut()}>
              sign out
            </button>
          ) : (
            <button className="btn mt-6" onClick={() => signIn("spotify")}>
              sign in
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
