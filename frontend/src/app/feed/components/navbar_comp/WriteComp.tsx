import Link from "next/link";
import {FaEdit} from "react-icons/fa"

export default function Dashboard() {
  return (
    <div>
      <Link href="/write" className="flex gap-x-3 items-center font-light text-2xl">
        <FaEdit /> Write
      </Link>
    </div>
  );
}