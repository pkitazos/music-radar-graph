import Link from "next/link";

interface props {
  title: string;
  description: string;
  href: string;
}

const PageButton = ({ title, description, href }: props) => {
  return (
    <Link
      href={href}
      className="h-60 w-60 rounded-lg bg-gray-900/50 p-6 transition-all duration-200 hover:scale-105 hover:bg-gray-900/80 group-hover:opacity-40 group-hover:hover:opacity-100"
    >
      <h2 className="text-2xl text-lime-400">{title}</h2>
      <p className="mt-4">{description}</p>
    </Link>
  );
};

export default PageButton;
