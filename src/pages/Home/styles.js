import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: var(--dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
`;

export const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--primary);
  border-bottom: 1px solid var(--darkGray);
  box-shadow: 0px 1px 5px var(--darkGray);
  z-index: 9;
`;

export const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px;
  margin-top: 60px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px var(--dark);
  cursor: pointer;
  transition: 0.2s;

  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px var(--dark);
  }
`;

export const Menu = styled.nav`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  gap: 100px;
  height: 100%;

  div {
    position: relative;
    transition: 0.5s;
    padding-bottom: 10px;

    ::after {
      content: "";
      width: 0%;
      height: 2px;
      position: absolute;
      background-color: #ffffff;
      bottom: 0%;
      left: 0%;
      transition: all 0.5s ease;
    }

    :hover::after {
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 1280px;
  flex-direction: row;
  gap: 30px;
  padding: 100px 0 30px 0;
  flex-wrap: wrap;
  background-color: var(--light);
`;

export const ProductCard = styled(Card)`
  width: 345px;
`;

export const ProductImage = styled(CardMedia)`
  height: 180px;
  box-shadow: 2px 2px 2px var(--dark);
`;

export const ProductActionArea = styled(CardActionArea)`
  h3 {
    font-weight: bold;
  }
  :hover {
    background-color: var(--dark);
    color: white;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #000000;
  padding: 30px 0;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 1280px;
`;

export const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
`;

export const ContentModal = styled.div`
  display: grid;
  grid-template-areas: "image image description description" "image image shops price" "developer developer developer developer";
  width: 1280px;
  gap: 20px;
  padding: 30px;

  > img {
    max-width: 640px;
    min-width: 640px;
    grid-area: image;
    border-radius: 20px;
    box-shadow: 3px 3px 3px black;
  }
`;

export const DescriptionModal = styled.div`
  grid-area: description;
`;

export const ShopsModal = styled.div`
  grid-area: shops;

  > h3 {
    transition: 0.2s;
    cursor: pointer;

    :hover {
      color: var(--light);
    }

    :active {
      transform: scale(0.95);
    }
  }
`;

export const PriceModal = styled.div`
  grid-area: price;
  display: grid;
  justify-content: flex-end;
  align-items: center;
  grid-template-areas: "code code" "button text";

  > button {
    grid-area: button;
    background-color: green;
    color: white;
    flex: 2;
  }

  > h1 {
    grid-area: text;
    flex: 1;
    background-color: #000000;
    padding: 5px;
    border-radius: 0 5px 5px 0;
  }

  > img {
    grid-area: code;
    max-width: 150px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
`;

export const DeveloperModal = styled.div`
  grid-area: developer;
  display: flex;
  align-items: center;
  gap: 5px;

  > h2 {
    font-weight: bold;
  }
`;
