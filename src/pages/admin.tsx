import { type NextPage } from "next";
import Head from "next/head";

import { SideMenu } from "~/components";
// import { api } from "~/utils";

const Profile: NextPage = () => {
  // let { mutate: addFeaturedTemplates } =
  //   api.adminRouter.addFeatureAlbums.useMutation();

  // let { mutate: addFirstInstances } =
  //   api.adminRouter.addFirstInstance.useMutation();

  return (
    <>
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <h1>Hey! You shouldn&apos;t be here!</h1>
          <div className="mt-4">
            {/* <button
            className="btn-error btn"
            onClick={() => addFeaturedTemplates()}
          >
            CREATE TEMPLATES
          </button> */}
            {/* <button
              className="btn-error btn w-max transition-all hover:scale-[1.02]"
              onClick={() => addFirstInstances()}
            >
              CREATE INSTANCES
            </button> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
