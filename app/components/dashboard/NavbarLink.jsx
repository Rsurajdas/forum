import { Tooltip, rem } from '@mantine/core';
import classes from '../../styles/Navbar.module.css';
import { NavLink } from '@remix-run/react';

export default function NavbarLink({ icon: Icon, label, path }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink to={path} className={classes.link}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </NavLink>
    </Tooltip>
  );
}
