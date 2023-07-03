/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import { DiscIcon, InfoIcon, MapIcon, UserIcon } from "~/SVGs";

interface props {
  children?: ReactNode[];
}

const SideMenu = ({ children }: props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const path = router.pathname;

  // TODO: sort out signIn and signOut type errors for entire file

  return (
    <div className="left-0 top-0 h-screen">
      <ul className="menu rounded-box w-max gap-1 p-2">
        <li className="tooltip tooltip-right" data-tip="Info">
          <div className="hover:bg-slate-800/50">
            <InfoIcon />
          </div>
        </li>
        {user ? (
          <li className="group relative">
            <Link href="/profile" className="avatar hover:bg-slate-800/50">
              <div className="w-5 rounded-full">
                <img src={user.image || ""} />
              </div>
            </Link>
            <div className="menu absolute left-14 top-0 hidden w-max bg-slate-900/50 group-hover:block">
              <li>
                <Link href="/profile" className="hover:bg-slate-800/50">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="btn-md btn mt-2  hover:bg-slate-800/50"
                >
                  sign out
                </button>
              </li>
            </div>
          </li>
        ) : (
          <li className="tooltip tooltip-right" data-tip="Sign In">
            <button
              onClick={() => signIn("spotify")}
              className="hover:bg-slate-800/50"
            >
              <UserIcon />
            </button>
          </li>
        )}
        <div className="divider" />

        <li className="tooltip tooltip-right" data-tip="Where am I going?">
          <Link
            href="/"
            className={` ${
              path == "/" ? "text-lime-500" : ""
            } hover:bg-slate-800/50`}
          >
            <MapIcon />
          </Link>
        </li>
        <li className="tooltip tooltip-right" data-tip="Album selection">
          <Link
            href="/rh"
            className={` ${
              path.startsWith("/rh") ? "text-lime-500" : ""
            } hover:bg-slate-800/50`}
          >
            <DiscIcon />
          </Link>
        </li>
        <div className="divider" />
        {children?.length && (
          <>
            {children}
            <div className="divider" />
          </>
        )}
      </ul>
    </div>
  );
};

export default SideMenu;
