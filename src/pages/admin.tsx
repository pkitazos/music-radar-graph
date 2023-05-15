import { type NextPage } from "next";
import Head from "next/head";

import { SideMenu } from "~/components";
import { api } from "~/utils";

const Profile: NextPage = () => {
  let { mutate: addFeaturedTemplates } =
    api.adminRouter.addFeatureAlbums.useMutation();

  return (
    <>
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <h1>Hey! You shouldn't be here! Naughty!</h1>
          {/* <button
            className="btn-error btn"
            onClick={() => addFeaturedTemplates()}
          >
            CLICK
          </button> */}
        </div>
      </main>
    </>
  );
};

export default Profile;
