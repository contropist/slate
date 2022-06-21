import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsiteHeader from "~/components/core/WebsiteHeader";
import WebsiteFooter from "~/components/core/WebsiteFooter";
import Link from "next/link";

import { css } from "@emotion/react";
import { useEventListener } from "~/common/hooks";

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
  font-family: ${Constants.font.semiBold};
  flex-shrink: 0;
  flex-shrink: 0;
  min-width: 50%;
  max-width: 100%;
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -0.035em;
  margin-bottom: 30px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: 32px;
    line-height: 40px;
  }

  @keyframes heading-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(30%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: heading-fade-in 300ms ease-in-out;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.text};
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-bottom: 49px;

  @keyframes body-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(30%);
    }
    50% {
      opacity: 0%;
      transform: translateY(30%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: body-fade-in 500ms ease-in-out;
`;

const STYLES_JUMPER = css`
  @keyframes jumper-fade-in {
    0% {
      opacity: 0%;
      transform: translateY(5%);
    }
    50% {
      opacity: 0%;
      transform: translateY(5%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: jumper-fade-in 700ms ease-in-out;
`;

const STYLES_FLEX = css`
  position: absolute;
  bottom: 48px;
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Constants.sizes.tablet}px) {
    bottom: 96px;
  }
`;

const STYLES_BUTTON = css`
  cursor: poitner;
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  border: 1.25px solid ${Constants.semantic.borderGray};
  color: ${Constants.semantic.textBlack};

  :hover {
    background-color: ${Constants.semantic.textGray};
    color: ${Constants.semantic.textWhite};
  }
`;

export const useGuideKeyCommands = (next, prev) => {
  const handleKeyUp = (e) => {
    const input = document.querySelectorAll("input");
    for (let elem of input) {
      if (document.activeElement === elem) {
        return;
      }
    }
    const textarea = document.querySelectorAll("textarea");
    for (let elem of textarea) {
      if (document.activeElement === elem) {
        return;
      }
    }

    switch (e.key) {
      case "ArrowRight":
        if (next) window.location.replace(next);
        break;
      case "ArrowLeft":
        if (prev) window.location.replace(prev);
        break;
    }
  };
  useEventListener({ type: "keyup", handler: handleKeyUp });
};

export default function Guide(props) {
  useGuideKeyCommands(props.next, props.prev);
  return (
    <WebsitePrototypeWrapper
      title={props.title}
      description={props.description}
      url={props.url}
      image={props.image}
    >
      <WebsiteHeader />
      <div css={STYLES_ROOT}>
        <div css={STYLES_CONTAINER}>
          <div css={STYLES_HEADING}>{props.heading}</div>
          <div css={STYLES_BODY}>{props.body}</div>
          <div css={STYLES_JUMPER}>{props.jumper}</div>
          <div css={STYLES_FLEX}>
            <Link href={props.prev}>
              <a css={STYLES_BUTTON} style={{ marginRight: `12px` }}>
                <SVG.LeftArrow height={16} width={16} />
              </a>
            </Link>
            <Link href={props.next}>
              <a css={STYLES_BUTTON}>
                <SVG.RightArrow height={16} width={16} />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <WebsiteFooter />
    </WebsitePrototypeWrapper>
  );
}
