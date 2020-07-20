import React, { useState, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import { spaces, colors } from "../common/variables.js";

import DxcBox from "../box/Box";
import ThemeContext from "../ThemeContext.js";

const DxcCard = ({
  imageSrc,
  children,
  margin,
  linkHref,
  onClick,
  imageBgColor,
  imagePadding,
  imagePosition,
  theme,
  outlined,
  imageCover,
}) => {
  const [isHovered, changeIsHovered] = useState(false);
  const colorsTheme = useContext(ThemeContext) || colors;

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  const tagContent = (
    <DxcBox shadowDepth={outlined ? 0 : isHovered && (onClick || linkHref) ? 2 : 1}>
      <CardContainer
        brightness={theme}
        hasAction={onClick || linkHref}
        outlined={outlined}
        imagePosition={imagePosition}
      >
        <ImageContainer imageBgColor={imageBgColor}>
          <TagImage imagePadding={imagePadding} cover={imageCover} src={imageSrc}></TagImage>
        </ImageContainer>
        <CardContent>{children}</CardContent>
      </CardContainer>
    </DxcBox>
  );

  return (
    <ThemeProvider theme={colorsTheme}>
      <StyledDxcCard
        margin={margin}
        onMouseEnter={() => changeIsHovered(true)}
        onMouseLeave={() => changeIsHovered(false)}
        onClick={clickHandler}
        hasAction={onClick || linkHref}
      >
        {(linkHref && <StyledLink href={linkHref}>{tagContent}</StyledLink>) || tagContent}
      </StyledDxcCard>
    </ThemeProvider>
  );
};

const StyledDxcCard = styled.div`
  display: inline-flex;
  cursor: ${({ hasAction }) => (hasAction && "pointer") || "unset"};

  margin: ${({ margin }) => (margin && typeof margin !== "object" ? spaces[margin] : "0px")};
  margin-top: ${({ margin }) => (margin && margin.top ? spaces[margin.top] : "")};
  margin-right: ${({ margin }) => (margin && margin.right ? spaces[margin.right] : "")};
  margin-bottom: ${({ margin }) => (margin && margin.bottom ? spaces[margin.bottom] : "")};
  margin-left: ${({ margin }) => (margin && margin.left ? spaces[margin.left] : "")};
`;

const borderSizePx = "2";
const getBorder = (props) => {
  const color = props.brightness === "dark" || props.brightness === "medium" ? props.theme.white : props.theme.black;
  return props.outlined ? `${borderSizePx}px solid ${color}` : "none";
};
const CardContainer = styled.div`
  display: inline-flex;
  background: ${(props) =>
    props.brightness === "dark" ? props.theme.black : props.brightness === "medium" ? "#212121" : props.theme.white};
  color: ${(props) =>
    props.brightness === "dark" || props.brightness === "medium" ? props.theme.white : props.theme.black};
  align-items: center;
  flex-direction: ${({ imagePosition }) => (imagePosition === "before" && "row") || "row-reverse"};
  height: ${({ outlined }) => (outlined ? `${220 - 2 * borderSizePx}px` : "220px")};
  width: ${({ outlined }) => (outlined ? `${400 - 2 * borderSizePx}px` : "400px")};
  border: ${(props) => getBorder(props)};
  &:hover {
    border-color: ${(props) => (props.hasAction ? props.theme.yellow : "unset")};
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const TagImage = styled.img`
  height: ${({ imagePadding }) =>
    !imagePadding ? "100%" : `calc(100% - ${spaces[imagePadding]} - ${spaces[imagePadding]})`};
  width: ${({ imagePadding }) =>
    !imagePadding ? "100%" : `calc(100% - ${spaces[imagePadding]} - ${spaces[imagePadding]})`};
  object-fit: ${({ cover }) => (cover ? "cover" : "contain")};
`;

const ImageContainer = styled.div`
  width: 140px;
  height: 100%;
  flex-shrink: 0;
  background: ${({ imageBgColor }) => imageBgColor};
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const CardContent = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
`;

DxcCard.propTypes = {
  imageSrc: PropTypes.string,
  imageBgColor: PropTypes.string,
  imagePadding: PropTypes.oneOf([...Object.keys(spaces)]),
  imagePosition: PropTypes.oneOf(["before", "after"]),
  linkHref: PropTypes.string,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  imageCover: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "medium", "light"]),
  margin: PropTypes.oneOfType([
    PropTypes.shape({
      top: PropTypes.oneOf(Object.keys(spaces)),
      bottom: PropTypes.oneOf(Object.keys(spaces)),
      left: PropTypes.oneOf(Object.keys(spaces)),
      right: PropTypes.oneOf(Object.keys(spaces)),
    }),
    PropTypes.oneOf([...Object.keys(spaces)]),
  ]),
};

DxcCard.defaultProps = {
  imageSrc: null,
  margin: null,
  theme: "light",
  outlined: false,
  imagePadding: null,
  imageCover: false,
  linkHref: null,
  onClick: null,
  imageBgColor: "black",
  imagePosition: "before",
};

export default DxcCard;
