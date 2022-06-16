import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVGLogo from "~/common/logo";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsiteHeader from "~/components/core/WebsiteHeader";
import WebsiteFooter from "~/components/core/WebsiteFooter";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
  width: 100%;
  height: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 52px;
  overflow: hidden;
  height: calc(100vh - 113px);
  background-color: ${Constants.semantic.bgLight};
  color: ${Constants.semantic.textBlack};
`;

const STYLES_CONTAINER = css`
  max-width: 700px;
  margin: 0 auto;
  padding: 80px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 96px 16px;
  }
`;

const STYLES_HEADING = css`
  font-family: ${Constants.font.bold};
  flex-shrink: 0;
  flex-shrink: 0;
  min-width: 50%;
  max-width: 100%;
  font-size: 88px;
  line-height: 88px;
  letter-spacing: -0.05em;
  margin-bottom: 25px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 64px;
    line-height: 68px;
    letter-spacing: -0.04em;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 48px;
    line-height: 52px;
    letter-spacing: -0.04em;
  }
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.text};
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-bottom: 40px;
`;

const STYLES_CURSOR_BLINK = css`
  display: inline-block;
  background-color: ${Constants.semantic.textGray};
  width: 32px;
  height: 61px;
  margin-left: 6px;
  overflow: visible;
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 28.5px;
    height: 47px;
    margin-left: 4px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 21px;
    height: 35px;
    margin-left: 2px;
  }
`;

const STYLES_CURSOR_BLINK_SMALL = css`
  ${STYLES_CURSOR_BLINK}
  width: 25px;
  height: 41px;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 21px;
    height: 35px;
    margin-left: 2px;
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 17.5px;
    height: 29px;
    margin-left: 2px;
  }
`;

const STYLES_BUTTON = css`
  cursor: poitner;
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  padding: 18px 32px;
  border-radius: 20px;
  font-family: ${Constants.font.medium};
  font-size: 18px;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid ${Constants.semantic.borderGray};
  color: ${Constants.semantic.textBlack};

  :hover {
    background-color: ${Constants.semantic.textGray};
    color: ${Constants.semantic.textWhite};
  }
`;

export default function IndexPage() {
  const title = `Slate`;
  const description = "Your personal search engine";
  const url = "https://slate.host/";
  const image =
    "https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4";

  return (
    <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
      <WebsiteHeader />
      <div css={STYLES_ROOT}>
        <div css={STYLES_CONTAINER}>
          <div css={STYLES_HEADING}>
            Search your internet memory
            <span css={STYLES_CURSOR_BLINK} />
          </div>
          <div css={STYLES_BODY}>
            Slate is a Chrome extension that helps you save, organize and search stuff you care
            about on the web. It’s a lightweight tool designed to make the internet feel a little
            more personal.
          </div>
          <a css={STYLES_BUTTON} href="../get-started">
            Get Started <SVG.RightArrow height={20} width={20} style={{ marginLeft: 8 }} />
          </a>
        </div>
      </div>
      <WebsiteFooter />
    </WebsitePrototypeWrapper>
  );
}
