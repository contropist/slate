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
  min-height: calc(100vh - 61px);
  background-color: ${Constants.semantic.bgLight};
  color: ${Constants.semantic.textBlack};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: ${Constants.sizes.mobile}px) {
    min-height: calc(100vh - 112px);
  }
`;

const STYLES_CONTAINER = css`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px 0 96px 0;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 16px 16px 32px 16px;
  }
`;

const STYLES_HEADING = css`
  flex-shrink: 0;
  color: ${Constants.semantic.textBlack};
  flex-shrink: 0;
  min-width: 50%;
  max-width: 100%;
`;

const STYLES_HEADING1 = css`
  ${STYLES_HEADING};
  font-family: ${Constants.font.bold};
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

const STYLES_HEADING2 = css`
  ${STYLES_HEADING};
  font-family: ${Constants.font.medium};
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.02em;
  margin: 40px 0 4px 0;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.text};
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
`;

export default function FAQPage() {
  const title = `FAQs - Slate`;
  const description = "Your personal search engine";
  const url = "https://slate.host/faqs";
  const image =
    "https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4";

  return (
    <WebsitePrototypeWrapper title={title} description={description} url={url} image={image}>
      <div css={STYLES_ROOT}>
        <WebsiteHeader />
        <div css={STYLES_CONTAINER}>
          <div css={STYLES_HEADING1}>FAQs</div>
          <div css={STYLES_HEADING2}>What is a personal search engine?</div>
          <div css={STYLES_BODY}>
            Slate is a Chrome extension that helps you save, organize and search stuff you care
            about on the web. It’s a lightweight tool designed to make the internet feel a little
            more personal.
          </div>
          <div css={STYLES_HEADING2}>How will Slate protect my privacy?</div>
          <div css={STYLES_HEADING2}>How much does Slate cost?</div>
        </div>
      </div>
      <WebsiteFooter />
    </WebsitePrototypeWrapper>
  );
}
