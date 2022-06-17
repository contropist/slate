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
  ${Styles.VERTICAL_CONTAINER};

  position: relative;
  width: ${JUMPER_WIDTH}px;
  height: ${JUMPER_HEIGHT}px;
  z-index: 23423423432;

  border: 1px solid ${theme.semantic.borderGrayLight};
  box-shadow: ${theme.shadow.darkLarge};
  //NOTE(amine): when changing border-radius, change it also in STYLES_MARBLE_WRAPPER and STYLES_APP_MODAL_BACKGROUND
  border-radius: 16px;
  overflow: hidden;

  background-color: ${theme.semantic.white};
  border-radius: 16px;
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurLight};
  }
`;

function Root({ children, ...props }) {
  return (
    <div css={STYLES_JUMPER_ROOT} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Header
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_HEADER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  padding: 12px 16px;
`;

function Header({ ...props }) {
  return (
    <div css={STYLES_JUMPER_HEADER} {...props}>
      <SVG.Link width={20} height={20} />
      <System.H3 color="textGrayLight" style={{ marginLeft: 12 }}>
        Search by keywords or #tags
      </System.H3>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  Body
 * -----------------------------------------------------------------------------------------------*/

const STYLES_JUMPER_BODY = css`
  padding: 12px 8px;
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

function Object({ title, isSelected, isSaved, Favicon, ...props }) {
  return (
    <div css={[STYLES_JUMPER_OBJECT, isSelected && STYLES_JUMPER_OBJECT_IS_SELECTED]} {...props}>
      {isSelected ? <div css={STYLES_JUMPER_OBJECT_CHECKBOX} /> : <Favicon />}
      <System.H5 color="textBlack" nbrOflines={1} style={{ marginLeft: 12, maxWidth: 438 }}>
        {title}
      </System.H5>
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
            <SVG.CheckCircle css={STYLES_COLOR_SYSTEM_GREEN} width={16} />{" "}
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
  width: ${JUMPER_WIDTH}px;
  padding: 8px;
  border-radius: 16px;
  background-color: white;
  border: 1px solid ${theme.semantic.borderGrayLight};
  box-shadow: ${theme.shadow.darkLarge};

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurWhite};
  }
`;

const TopPanel = ({ children }) => {
  return <div css={STYLES_JUMPER_TOP_PANEL}>{children}</div>;
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
      {children}
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
