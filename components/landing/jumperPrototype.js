import * as React from "react";
import * as Styles from "~/common/styles";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { Divider } from "~/components/system";

const JUMPER_WIDTH = 700;
const JUMPER_HEIGHT = 432;

/* -------------------------------------------------------------------------------------------------
 *  Root
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_ROOT = (theme) => css`
  width: ${JUMPER_WIDTH}px;
  height: ${JUMPER_HEIGHT}px;
  background-color: ${theme.semantic.bgBlurLight6};
  border-radius: 16px;
  //NOTE(amine): when changing border-radius, change it also in STYLES_MARBLE_WRAPPER and STYLES_APP_MODAL_BACKGROUND
  overflow: hidden;
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurLight};
  }
`;

const STYLES_JUMPER_ROOT_WRAPPER = (theme) => css`
  ${Styles.VERTICAL_CONTAINER};
  ${STYLES_JUMPER_ROOT}
  -moz-box-shadow: ${theme.shadow.lightMedium};
  -webkit-box-shadow: ${theme.shadow.lightMedium};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background-image: url("../public/static/bg-jumper.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  border: 1px solid ${theme.semantic.borderGrayLight};
  border-radius: 16px;
  //NOTE(amine): when changing border-radius, change it also in STYLES_MARBLE_WRAPPER and STYLES_APP_MODAL_BACKGROUND
  overflow: hidden;
  width: ${JUMPER_WIDTH}px;
  height: ${JUMPER_HEIGHT}px;
  position: relative;
  z-index: 23423423432;
`;

const STYLES_IMG = css`
  height: 16px;
`;

function Root({ children, ...props }) {
  return (
    <div css={STYLES_JUMPER_ROOT_WRAPPER} {...props}>
      <div css={STYLES_JUMPER_ROOT}>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Header
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_HEADER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 12px 20px;
`;

function Header({ ...props }) {
  const slate = "../public/static/Slate_volumetric.png";
  return (
    <div css={STYLES_JUMPER_HEADER} {...props}>
      <img css={STYLES_IMG} src={slate} alt="Slate volumetric logo" />
      {!!props.search ? (
        <System.H3 color="textBlack" style={{ marginLeft: 12, marginTop: 3, marginBottom: 1 }}>
          {props.search}
        </System.H3>
      ) : (
        <System.H3 color="textGrayLight" style={{ marginLeft: 12, marginTop: 3, marginBottom: 1 }}>
          Search by keywords or #tags
        </System.H3>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Body
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_BODY = css`
  padding: 8px;
  overflow: hidden;
`;

function Body({ children, ...props }) {
  return (
    <div css={STYLES_JUMPER_BODY} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Object
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_OBJECT = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 10px 12px;
  border-radius: 12px;
  color: ${theme.semantic.textBlack};
`;

const STYLES_JUMPER_OBJECT_IS_SELECTED = (theme) => css`
  background-color: ${theme.semantic.bgGrayLight};
`;

const STYLES_JUMPER_OBJECT_CHECKBOX = (theme) => css`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${theme.semantic.borderGray};
`;

const STYLES_COLOR_SYSTEM_GREEN = (theme) => css`
  color: ${theme.system.green};
`;

const STYLES_TAG = (theme) => css`
  box-sizing: border-box;
  background: ${theme.semantic.bgWhite};
  border: 1px solid ${theme.semantic.borderGrayLight};
  box-shadow: 0px 4px 16px rgba(174, 176, 178, 0.1);
  border-radius: 8px;
  font-size: 12px;
  line-height: 20px;
  padding: 2px 8px;
  color: ${theme.semantic.textBlack};
  font-family: ${theme.font.medium};
  margin-left: 8px;
`;

function Object({ title, isSelected, isSaved, Favicon, tag, ...props }) {
  return (
    <div css={[STYLES_JUMPER_OBJECT, isSelected && STYLES_JUMPER_OBJECT_IS_SELECTED]} {...props}>
      {isSelected ? (
        <div css={STYLES_JUMPER_OBJECT_CHECKBOX} />
      ) : (
        <Favicon style={{ height: 16, width: 16 }} />
      )}
      {!!tag ? (
        <React.Fragment>
          <div css={STYLES_TAG}>{tag}</div>
          <System.H5
            color="textBlack"
            nbrOflines={1}
            style={{ marginLeft: 4, marginTop: 3, marginBottom: 1, maxWidth: 280 }}
          >
            {title}
          </System.H5>
        </React.Fragment>
      ) : (
        <System.H5
          color="textBlack"
          nbrOflines={1}
          style={{ marginLeft: 12, marginTop: 3, marginBottom: 1, maxWidth: 438 }}
        >
          {title}
        </System.H5>
      )}
      <div css={Styles.HORIZONTAL_CONTAINER} style={{ marginLeft: "auto" }}>
        {isSelected ? (
          <>
            <div style={{ margin: 2, marginLeft: 8 }}>
              <SVG.Hash width={16} />
            </div>
            <div style={{ margin: 2, marginLeft: 8 }}>
              <SVG.CopyAndPaste width={16} />
            </div>
            <div style={{ margin: 2, marginLeft: 8 }}>
              <SVG.XCircle width={16} />
            </div>
            {!isSaved ? (
              <div style={{ margin: 2, marginLeft: 8 }}>
                <SVG.Plus width={16} />
              </div>
            ) : null}
          </>
        ) : null}

        {isSaved ? (
          <div style={{ margin: 2, marginLeft: 8 }}>
            <SVG.Saved css={STYLES_COLOR_SYSTEM_GREEN} width={16} />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Top panel
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_TOP_PANEL = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER};
  background-color: ${theme.semantic.bgBlurLight6};
  padding: 8px;
  border-radius: 16px;
  overflow: hidden;

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurLight6};
  }
`;

const STYLES_JUMPER_TOP_PANEL_WRAPPER = (theme) => css`
  ${STYLES_JUMPER_TOP_PANEL}
  -moz-box-shadow:: ${theme.shadow.lightMedium};
  -webkit-box-shadow: ${theme.shadow.lightMedium};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background-image: url("../public/static/bg-space-switcher.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  border: 1px solid ${theme.semantic.borderGrayLight};
  width: ${JUMPER_WIDTH}px;
  border-radius: 16px;
  overflow: hidden;
`;

const TopPanel = ({ children, ...props }) => {
  return (
    <div css={STYLES_JUMPER_TOP_PANEL_WRAPPER} {...props}>
      <div css={STYLES_JUMPER_TOP_PANEL}>{children}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 *  View action
 * -----------------------------------------------------------------------------------------------*/

const STYLES_VIEW_ACTION = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  position: relative;
  border-radius: 12px;
  padding: 5px 12px 7px;
  color: ${theme.semantic.textGray};

  white-space: nowrap;
`;

const STYLES_VIEWS_ACTION_IS_SELECTED = (theme) => css`
  color: ${theme.semantic.textBlack};
  background-color: ${theme.semantic.bgGrayLight};
`;

const ViewAction = ({ children, Favicon, isSelected }) => {
  return (
    <div css={[STYLES_VIEW_ACTION, isSelected && STYLES_VIEWS_ACTION_IS_SELECTED]}>
      {Favicon && (
        <Favicon
          style={{
            marginRight: 4,
            opacity: isSelected ? 1 : 0.5,
            transition: "opacity 0.25s",
          }}
        />
      )}
      <System.H5>{children}</System.H5>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 *  View add button
 * -----------------------------------------------------------------------------------------------*/

const STYLES_VIEW_ADD_BUTTON = (theme) => css`
  ${Styles.BUTTON_RESET};
  border-radius: 8px;
  padding: 8px;
  height: 32px;
  width: 32px;
  background-color: ${theme.semantic.bgLight};

  &:hover {
    background-color: ${theme.semantic.bgGrayLight};
    color: ${theme.semantic.textBlack};
  }
`;

const ViewAddButton = (props) => {
  return (
    <div css={STYLES_VIEW_ADD_BUTTON} {...props}>
      <SVG.Plus />
    </div>
  );
};

export { Root, Header, Body, Object, Divider, TopPanel, ViewAction, ViewAddButton };
