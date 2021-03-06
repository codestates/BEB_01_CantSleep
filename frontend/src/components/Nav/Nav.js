import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import logo from '../../image/logo2.svg';
import { useStore } from '../../utils/store';
import { logout } from '../../utils/auth';

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-family: 'Roboto', sans-serif;
  background-color: #fefefe;
  @media (max-width: 1200px) {
    grid-template-columns: 4fr 1fr 4fr;

    ul {
      padding: 0;
    }
  }
`;
const NavLogoDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  gap: 10px;
  a {
    text-decoration: none;
    cursor: pointer;
    color: #00406e;
    font-size: 20px;
  }
  a:hover {
    color: black;
  }
  img {
    width: 50px;
    height: 50px;
  }
  img:hover {
    color: black;
  }
`;

const NavBar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 10px;
  a {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
  a:hover {
    color: #05b388;
  }
  input {
    width: 200px;
  }
  li {
    list-style: none;
    text-decoration: none;
    width: 100%;
  }
  @media (max-width: 1200px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0;
    a {
      font-size: 13px;
    }
    input {
      height: 32px;
    }
    ul {
      padding: 0;
      justify-content: center;
    }
    li {
      text-align: center;
      width: 50px;
    }
  }
`;

const NavInput = styled.input`
  font-size: 16px;
  border-radius: 25px;
  height: 42px;
  outline: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 5px rgb(109 207 246 / 50%);
  padding-left: 2rem;
  padding-right: 2.5rem;
  cursor: auto;
  border: none;
  :hover {
    transition: all 0.2s ease-in-out;
    background-color: #05b388;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;

const ProfileIcon = styled.div`
  background-image: linear-gradient(
    319deg,
    #118ab2 0%,
    #06d6a0 37%,
    #ffd166 100%
  );

  background-repeat: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: #f2f2f2;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  border: solid 10px #ffffff;

  :hover {
    opacity: 0.7;
  }
`;

const Nav = () => {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  return (
    <NavContainer>
      <NavLogoDiv>
        <Link to="/">
          <img src={logo} />
        </Link>
        <Link to="/">CantSleep</Link>
      </NavLogoDiv>
      <div></div>
      <NavBar>
        <NavInput type="text" placeholder="??????" />
        {user?.username ? (
          <Link to="/mypage">
            <ProfileIcon />
          </Link>
        ) : (
          <Link to="/login">
            <li>?????????</li>
          </Link>
        )}
        {user?.username ? (
          <Link
            to="/"
            onClick={() => {
              logout();
              setUser({});
            }}
          >
            <li>????????????</li>
          </Link>
        ) : (
          <Link to="/register">
            <li>????????????</li>
          </Link>
        )}
        {user?.username ? (
          <>
            <Link to="/explore">
              <li>NFT</li>
            </Link>
            <Link to="/create">
              <li>
                <AiFillEdit size={30} />
              </li>
            </Link>
            <Link to="/createNFT">
              <li>
                <BsImage size={30} />
              </li>
            </Link>
          </>
        ) : null}
      </NavBar>
    </NavContainer>
  );
};

export default Nav;
