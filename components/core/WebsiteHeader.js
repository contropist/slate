import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";

const STYLES_ROOT = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: ${Constants.zindex.header};
  background-color: ${Constants.semantic.bgLight};
`;

const STYLES_CONTAINER = css`
  max-width: 1080px;
  margin: 0 auto;
  font-family: ${Constants.font.medium};
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${Constants.font.medium};
  color: ${Constants.semantic.textBlack};
  font-size: 14px;
  text-decoration: none;
  line-height: 20px;
  letter-spacing: -0.01px;
  text-align: left;
  padding: 16px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: 480px;
    padding: 16px;
    display: flex;
  }
`;

const STYLES_LOGO = css`
  flex-shrink: 0;
  height: 24px;
  width: 24px;
`;

const STYLES_BUTTON = css`
  cursor: poitner;
  display: inline-flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  box-shadow: ${Constants.shadow.lightSmall};
  text-decoration: none;
  font-family: ${Constants.font.medium};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006px;
  cursor: pointer;
`;

const STYLES_BUTTON_PRIMARY = css`
  ${STYLES_BUTTON};
  color: ${Constants.semantic.textWhite};
  background-color: ${Constants.system.blue};
`;

const STYLES_BUTTON_PRIMARY_SMALL = css`
  ${STYLES_BUTTON_PRIMARY};
  padding: 1px 12px 3px;
  border-radius: 8px;
`;

const STYLES_IMG = css`
  height: 20px;
`;

const WebsiteHeader = (props) => {
  const slate = "../public/static/Slate_volumetric.png";

  return (
    <div css={STYLES_ROOT}>
      <div css={STYLES_CONTAINER} style={props.style}>
        <div css={STYLES_LOGO}>
          <a href="../">
            <img css={STYLES_IMG} src={slate} alt="Slate volumetric logo" />
          </a>
        </div>
        <div>
          <a css={STYLES_BUTTON_PRIMARY_SMALL} href="../_/auth">
            Install Slate for Chrome
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebsiteHeader;
