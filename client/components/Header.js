import React from 'react';
import { Main, Link } from './style/HeaderStyles';

const Header = (props) => {
  return (<Main>
    <Link href="/auth/linkedin">Log in - </Link>
    <Link href="/auth/test">Test - </Link>
    <Link href="/data">Data - </Link>
    <Link href="/home">Home</Link>
  </Main>);
};

export default Header;
