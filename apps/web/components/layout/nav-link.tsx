import Link from "next/link";


const NavLink = ({ title, url }: { title: string; url: string }) => {
    return <Link href={ url }>{title}</Link>;
};

export default NavLink;
