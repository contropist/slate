import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_ROOT = css`
  width: 100%;
  margin: 0 auto;
  background-color: ${Constants.semantic.bgGrayLight};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const STYLES_CONTAINER = css`
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  font-family: ${Constants.font.medium};
  color: ${Constants.semantic.textGray};
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: -0.01px;
  padding: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 8px 16px;
  }
`;

const STYLES_LINK = css`
  text-decoration: none;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: -0.01px;
  color: ${Constants.semantic.textGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_FLEX = css`
  display: flex;
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_FLEX_BLOCK = css`
  display: flex;
  width: 33.3%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 2px 0;
  }
`;

const STYLES_FLEX_RIGHT = css`
  ${STYLES_FLEX_BLOCK};
  justify-content: flex-end;
  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: start;
  }
`;

const STYLES_FLEX_CENTER = css`
  ${STYLES_FLEX_BLOCK};
  justify-content: center;
  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: start;
  }
`;

const STYLES_FLEX_LEFT = css`
  ${STYLES_FLEX_BLOCK};
  justify-content: flex-start;
  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: start;
  }
`;

const STYLES_HR = css`
  background-color: ${Constants.semantic.borderGrayLight4};
  width: 100%;
  height: 1px;
`;

export const WebsiteFooter = (props) => {
  const discordURL = "https://discord.gg/NRsUjpCypr";
  const twitterURL = "https://twitter.com/_slate";
  const mailtoSlate = "mailto:hello@slate.host?subject=Hello Slate Team";
  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_HR} />
      <div css={STYLES_CONTAINER} style={props.style}>
        <div css={STYLES_FLEX}>
          <div css={STYLES_FLEX_LEFT}>
            <a css={STYLES_LINK} style={{ marginRight: `16px` }} href="/about">
              About Us
            </a>
            <a css={STYLES_LINK} style={{ marginRight: `16px` }} href="/faqs">
              FAQs
            </a>
          </div>
          <div css={STYLES_FLEX_CENTER}>
            <span style={{ fontSize: `10px`, marginRight: `4px` }}>Ⓒ</span>2022 Slate. All rights
            reserved.
          </div>
          <div css={STYLES_FLEX_RIGHT}>
            <a css={STYLES_LINK} style={{ marginRight: `16px` }} href="/terms">
              Terms of Service
            </a>
            <a css={STYLES_LINK} style={{ marginRight: `16px` }} href={mailtoSlate} target="_blank">
              <SVG.Mail height={20} width={20} strokeWidth={1} />
            </a>
            <a css={STYLES_LINK} style={{ marginRight: `12px` }} href={twitterURL} target="_blank">
              <SVG.Twitter height={20} width={20} strokeWidth={1} />
            </a>
            <a css={STYLES_LINK} href={discordURL} target="_blank">
              <SVG.Discord height={21} width={24} strokeWidth={1} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFooter;
