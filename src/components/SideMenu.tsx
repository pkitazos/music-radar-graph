import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";
import { DiscIcon, InfoIcon, MapIcon } from "~/SVGs";
import UserIcon from "~/SVGs/UserIcon";

interface props {
  children?: ReactNode[];
}

const SideMenu = ({ children }: props) => {
  let { data: session } = useSession();
  let user = session?.user;

  return (
    <div className="left-0 top-0 h-screen">
      <ul className="menu rounded-box w-max gap-1 p-2">
        <li className="tooltip tooltip-right" data-tip="Info">
          <div className="text-accent hover:bg-slate-800/50">
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
          <Link href="/" className="hover:bg-slate-800/50">
            <MapIcon />
          </Link>
        </li>
        <li className="tooltip tooltip-right" data-tip="Album selection">
          <Link href="/graphs" className="hover:bg-slate-800/50">
            <DiscIcon />
          </Link>
        </li>
        <div className="divider" />

        {/* //* adds new chart -> move to graph creation part of app */}
        {/*
        <li className="tooltip tooltip-right" data-tip="create new Graph">
          <div
            className="hover:bg-slate-800/50"
            onClick={() => {
              setSavedCharts((e) => [...e, { ...defaultChart }]);
              setSelectedChart(savedCharts.length);
            }}
          >
            <PlusIcon />
          </div>
        </li> */}
        {/* //* Something about saved charts (will load using custom hook) */}
        {/* {savedCharts &&
          savedCharts.map((_, i) => (
            <li
              key={i}
              className="tooltip tooltip-right"
              data-tip={savedCharts[i]?.albumName || "new album"}
            >
              <button
                onClick={() => setSelectedChart(i)}
                className={`hover:bg-slate-800/50 ${colorFill(i)}`}
              >
                <GraphIcon />
              </button>
            </li>
          ))} */}
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
