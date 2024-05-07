import classes from '../../styles/Header.module.css';

export default function Header() {
  return (
    <header className='fixed top-0 right-0 left-0'>
      <nav className={classes.header}></nav>
    </header>
  );
}
