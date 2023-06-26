import Link from "next/link";
import type { ReactNode } from "react";

interface props {
  title: string;
  children?: ReactNode;
  href: string;
}

const PageButton = ({ title, children: description, href }: props) => {
  return (
    <Link
      href={href}
      className=" mono flex h-64 w-64 flex-col justify-center rounded-lg bg-gray-900/50 p-6 transition-all duration-200 odd:rounded-tl-[10rem] odd:text-right even:rounded-br-[10rem] even:text-left hover:scale-105 hover:bg-gray-900/80 group-hover:opacity-40 group-hover:hover:opacity-100"
    >
      <h2 className="text-2xl text-white">{title}</h2>
      {description && (
        <p className="mt-4 text-lg tracking-wider">{description}</p>
      )}
    </Link>
  );
};

export default PageButton;
