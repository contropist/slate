import * as React from "react";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";
import * as SVG from "~/common/svg";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

import { css } from "@emotion/react";
import { isUsingMac } from "~/common/utilities";

const STYLES_SAVING_SHORTCUT_ICON = (theme) => css`
  padding: 8px;
  min-width: 32px;
  line-height: 16px;
  text-align: center;
  background-color: ${theme.semantic.bgGrayLight};
  border-radius: 8px;
  color: ${theme.semantic.textBlack};
`;
function JumperKeyboardShortcut(props) {
  return (
    <div css={Styles.HORIZONTAL_CONTAINER_CENTERED} {...props}>
      <System.H4 as="p" color="textBlack" css={STYLES_SAVING_SHORTCUT_ICON}>
        {isUsingMac() ? "⌘" : "Ctrl"}
      </System.H4>
      <System.H4
        as="p"
        color="textBlack"
        css={STYLES_SAVING_SHORTCUT_ICON}
        style={{ marginLeft: 4 }}
      >
        {isUsingMac() ? "J" : "."}
      </System.H4>
    </div>
  );
}

const STYLES_SLATE_LOGO_WRAPPER = (theme) => css`
  width: 28px;
  height: 28px;
  padding: 8px;
  border-radius: 50%;
  background-color: ${theme.semantic.bgGrayLight};
`;

function Logo() {
  return (
    <img
      src={"/static/logo.png"}
      alt="Slate logo"
      height={12}
      width={12}
      style={{ display: "block" }}
    />
  );
}

const STYLES_WRAPPER = (theme) => css`
  position: relative;
  background-color: ${theme.semantic.bgLight};
  width: 100%;
  height: 100vh;
`;

const STYLES_JUMPER_CONTAINER = (theme) => css`
  width: 700px;
  height: 432px;
  position: fixed;
  z-index: 2147483600;
  top: 50%;
  left: 50%;
  margin-left: calc(-348px);
  margin-top: calc(-274px);

  border: 1px dashed ${theme.semantic.borderGray};
  border-radius: 16px;
`;

const STYLES_JUMPER_TOP_BAR = (theme) => css`
  position: absolute;
  width: 100%;
  height: 48px;
  left: 0%;
  top: -13px;
  transform: translateY(-100%);

  border: 1px dashed ${theme.semantic.borderGray};
  border-radius: 16px;
`;

const STYLES_ARROW_UP_RIGHT = css`
  padding-left: 4px;
  vertical-align: middle;
  position: relative;
  top: -2px;
`;

export default function ExtensionOnboarding() {
  return (
    <WebsitePrototypeWrapper title="Extension Onboarding - Slate">
      <div css={STYLES_WRAPPER}>
        <section css={STYLES_JUMPER_CONTAINER}>
          <div
            css={Styles.VERTICAL_CONTAINER_CENTERED}
            style={{ position: "relative", height: "100%", width: "100%" }}
          >
            <div css={STYLES_JUMPER_TOP_BAR} />
            <System.H4 color="textBlack" style={{ marginTop: 130 }}>
              Press keyboard shortcut
            </System.H4>
            <JumperKeyboardShortcut style={{ marginTop: 10 }} />

            <System.Divider width="80px" height="1px" style={{ marginTop: 24, marginBottom: 24 }} />

            <System.H4 color="textBlack">
              Click on extension icon on the top right
              <SVG.ArrowUpRight height={16} width={16} css={STYLES_ARROW_UP_RIGHT} />
            </System.H4>
            <div css={STYLES_SLATE_LOGO_WRAPPER} style={{ marginTop: 8 }}>
              <Logo />
            </div>
          </div>
        </section>
      </div>
    </WebsitePrototypeWrapper>
  );
}
