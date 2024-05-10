import {
  IconDashboard,
  IconListTree,
  IconLogout,
  IconMessage,
  IconMessageDots,
  // IconSettings,
  IconUsers,
  IconCircles,
  IconTag
} from "@tabler/icons-react";
import classes from "../../styles/Navbar.module.css";
import NavbarLink from "./NavbarLink";
import { useState } from "react";
import { Stack } from "@mantine/core";

const navLists = [
  { icon: IconDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: IconListTree, label: "Forums", path: "/admin/forums" },
  { icon: IconMessage, label: "Topics", path: "/admin/topics" },
  { icon: IconMessageDots, label: "Posts", path: "/admin/posts" },
  { icon: IconUsers, label: "Users", path: "/admin/users" },
  // { icon: IconSettings, label: "Settings", path: "/admin/settings" },
  { icon: IconCircles, label: "Roles", path: "/admin/roles" },
  { icon: IconTag, label: "Tags", path: "/admin/tags" },
];

export default function Navbar() {
  const [active, setActive] = useState(0);

  return (
    <nav className={`${classes.navbar} shadow-md`}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {navLists.map((link, idx) => (
            <NavbarLink
              {...link}
              key={link.label}
              active={idx === active}
              onClick={() => setActive(idx)}
            />
          ))}
        </Stack>
      </div>
      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" path="/logout" />
      </Stack>
    </nav>
  );
}
