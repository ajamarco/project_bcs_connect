"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; //this will allow us to use the router and pathname, so we can highlight the active link
import Image from "next/image";

//import link names
import { sidebarLinks } from "@constants/index";

//the bottombar will be used solely for the footer of the website on mobile devices
const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          //check if the link is active
          const isActive =
            (pathname.includes(link.route) && link.route !== "/") ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(" ")[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
