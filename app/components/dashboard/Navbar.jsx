import {
  IconDashboard,
  IconListTree,
  IconLogout,
  IconMessage,
  IconMessageDots,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import classes from '../../styles/Navbar.module.css';
import NavbarLink from './NavbarLink';
import { useState } from 'react';
import { Stack } from '@mantine/core';

const navLists = [
  { icon: IconDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: IconListTree, label: 'Forums', path: '/forums' },
  { icon: IconMessage, label: 'Topics', path: '/topics' },
  { icon: IconMessageDots, label: 'Posts', path: '/posts' },
  { icon: IconUsers, label: 'Users', path: '/users' },
  { icon: IconSettings, label: 'Settings', path: '/settings' },
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
