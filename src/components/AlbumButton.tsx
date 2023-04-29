import Link from "next/link";
import Image from "next/image";
import { slugify } from "~/utils";

interface props {
  title: string;
}

const AlbumButton = ({ title }: props) => {
  return (
    <Link
      href={slugify(title)}
      className="flex flex-col items-center transition-all duration-200 hover:scale-105 group-hover:opacity-40 group-hover:hover:opacity-100"
    >
      <Image
        width={180}
        height={180}
        src={`/assets${slugify(title)}.png`}
        alt={`${title} album cover`}
      />
    </Link>
  );
};

export default AlbumButton;
