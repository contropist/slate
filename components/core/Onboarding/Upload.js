import * as React from "react";
import * as Styles from "~/common/styles";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";
import * as Utilities from "~/common/utilities";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ModalPortal } from "~/components/core/ModalPortal";
import { useCheckIfExtensionIsInstalled, useIsomorphicLayoutEffect } from "~/common/hooks";
import { DynamicIcon } from "~/components/core/DynamicIcon";

import ProfilePhoto from "~/components/core/ProfilePhoto";
import OnboardingPopup from "~/components/core/Onboarding/Popup";
import OnboardingOverlay from "~/components/core/Onboarding/Overlay";
import DownloadExtensionButton from "../Extension/DownloadExtensionButton";

/* -------------------------------------------------------------------------------------------------
 * Provider
 * -----------------------------------------------------------------------------------------------*/

const UploadOnboardingContext = React.createContext();
export const useUploadOnboardingContext = () => React.useContext(UploadOnboardingContext);

const steps = {
  welcome: "welcome",
  extension: "extension",
  trigger: "trigger",
  jumper: "jumper",
  finish: "finish",
};

function Provider({ children, viewer, onAction, ...props }) {
  const [currentStep, setCurrentStep] = React.useState(
    viewer?.onboarding?.upload ? steps.finish : steps.welcome
  );

  const { isExtensionDownloaded } = useCheckIfExtensionIsInstalled();

  const goToNextStep = React.useCallback(() => {
    if (currentStep === steps.finish) return;

    const nextStep = {
      welcome: "extension",
      extension: "trigger",
      trigger: "jumper",
      jumper: "finish",
    };

    setCurrentStep((prev) => nextStep[prev]);
  }, [currentStep, isExtensionDownloaded]);

  useIsomorphicLayoutEffect(() => {
    if (currentStep === steps.finish) {
      onAction({
        type: "UPDATE_VIEWER",
        viewer: { onboarding: { ...viewer.onboarding, upload: true } },
      });
      Actions.updateOnboarding({ upload: true });
    }
  }, [currentStep]);

  return (
    <UploadOnboardingContext.Provider value={{ currentStep, steps, goToNextStep }} {...props}>
      {children}
    </UploadOnboardingContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Welcome
 * -----------------------------------------------------------------------------------------------*/

const STYLES_WELCOME_WRAPPER = (theme) => css`
  ${Styles.CONTAINER_CENTERED};
  position: fixed;
  height: 100vh;
  width: 100%;
  padding: 16px;
  top: 0;
  left: 0;
  z-index: ${theme.zindex.cta};

  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurWhiteTRN};
  }
`;

function WelcomeOnboarding({ viewer }) {
  const { goToNextStep, currentStep, steps } = useUploadOnboardingContext();

  if (currentStep !== steps.welcome) return null;

  return (
    <ModalPortal>
      <div css={STYLES_WELCOME_WRAPPER}>
        <div css={Styles.VERTICAL_CONTAINER_CENTERED}>
          <ProfilePhoto user={viewer} style={{ borderRadius: "12px" }} size={64} />
          <System.H2 style={{ marginTop: 25, textAlign: "center" }} as="h1">
            Welcome to Slate, {viewer.username}
          </System.H2>
          <System.P1 style={{ marginTop: 5, textAlign: "center" }}>
            Slate is your personal search engine for the web. <br /> Use Slate for moodboards,
            research, personal storage etc.
          </System.P1>
          <System.ButtonSecondary
            onClick={goToNextStep}
            style={{ marginTop: 38, boxShadow: "none" }}
          >
            Get Started
          </System.ButtonSecondary>
        </div>
      </div>
    </ModalPortal>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Extension
 * -----------------------------------------------------------------------------------------------*/

function ExtensionOnboarding({ isMobile }) {
  const { goToNextStep } = useUploadOnboardingContext();

  const header = (
    <System.H2 as="h1">
      Save to Slate <br />
      as you browse the web
    </System.H2>
  );

  const body = (
    <img
      src={
        isMobile
          ? "/static/chrome-extension-jumper-mobile.png"
          : "/static/chrome-extension-jumper.png"
      }
      height={isMobile ? 411 : 281}
      width={isMobile ? 390 : 640}
      style={{ width: "100%" }}
      alt="chrome extension"
    />
  );

  const actions = (
    <>
      <System.ButtonSecondary
        onClick={goToNextStep}
        style={{ marginLeft: "auto", borderRadius: "8px", maxHeight: "24px" }}
      >
        Later
      </System.ButtonSecondary>
      <DownloadExtensionButton
        style={{ marginLeft: 8, borderRadius: "8px", minHeight: "24px", maxHeight: "24px" }}
      />
    </>
  );

  return (
    <ModalPortal>
      <MobileJumper.AnimatePresence>
        {isMobile ? (
          <MobileJumper.Root>
            <MobileJumper.Header>{header}</MobileJumper.Header>
            <MobileJumper.Content style={{ padding: 0 }}>{body}</MobileJumper.Content>
            <MobileJumper.Footer style={{ display: "flex" }}>{actions}</MobileJumper.Footer>
          </MobileJumper.Root>
        ) : null}
      </MobileJumper.AnimatePresence>
      {!isMobile ? (
        <Jumper.Root withDismissButton={false}>
          <Jumper.Header>{header}</Jumper.Header>
          <Jumper.Item style={{ flexGrow: 1, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
            {body}
          </Jumper.Item>
          <Jumper.Divider style={{ marginTop: "auto" }} />
          <Jumper.Item css={STYLES_JUMPER_FOOTER} style={{ marginTop: "auto" }}>
            {actions}
          </Jumper.Item>
        </Jumper.Root>
      ) : null}
    </ModalPortal>
  );
}

/* -------------------------------------------------------------------------------------------------
 *  UploadWalkthrough
 * -----------------------------------------------------------------------------------------------*/
const STYLES_OVERLAY_ZINDEX = css`
  z-index: 1;
`;

const STYLES_JUMPER_FOOTER = (theme) => css`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${theme.semantic.bgWhite};
  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurLight};
  }
`;

const PROTO_SCHOOL_CID = "https://proto.school/anatomy-of-a-cid/01";

const STYLES_UPLOAD_BUTTON = (theme) => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.semantic.bgGrayLight};
  border-radius: 8px;
  padding: 2px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  top: 3px;
`;

const STYLES_COPIED_INITIAL = (theme) => css`
  ${Styles.LINK};
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  color: ${theme.system.blue};
`;

const STYLES_COPIED_SUCCESS = (theme) => css`
  ${Styles.LINK};
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  color: ${theme.system.blue};
`;

const LINK_ARCHILLECT = "https://archillect.com";

function UploadWalkthrough() {
  const { currentStep, steps } = useUploadOnboardingContext();

  return (
    <div>
      <OnboardingOverlay css={currentStep === steps.jumper && STYLES_OVERLAY_ZINDEX} />
      <OnboardingPopup header="Save to Slate">
        {currentStep === steps.trigger ? (
          <>
            <System.P2>
              You can save links and files to Slate. <br />
              Just click on the
              <span css={STYLES_UPLOAD_BUTTON}>
                <SVG.Plus height="16px" />
              </span>
              button on top right.
            </System.P2>
            <System.P2 color="textGray" style={{ marginTop: 14 }}>
              1/<div style={{ display: "inline-block" }}>2</div>
            </System.P2>
          </>
        ) : (
          <>
            <System.P2>
              Save something you find interesting today.
              <br /> Or try pasting →
              <button
                css={[Styles.ICON_CONTAINER, Styles.BUTTON_RESET]}
                style={{ display: "inline-flex" }}
                onClick={() => Utilities.copyToClipboard(LINK_ARCHILLECT)}
              >
                <DynamicIcon
                  successState={
                    <span css={STYLES_COPIED_SUCCESS}>
                      <System.P2 as="span" style={{ marginLeft: 4 }}>
                        {LINK_ARCHILLECT}
                      </System.P2>
                      <SVG.Check height="16px" style={{ marginLeft: 4 }} />
                    </span>
                  }
                >
                  <span css={[STYLES_COPIED_INITIAL]}>
                    <System.P2 as="span" style={{ marginLeft: 4 }}>
                      {LINK_ARCHILLECT}
                    </System.P2>
                    <SVG.CopyAndPaste
                      height="16px"
                      style={{ marginLeft: 4, color: Constants.semantic.textGrayDark }}
                    />
                  </span>
                </DynamicIcon>
              </button>
            </System.P2>
            <System.P2 color="textGray" style={{ marginTop: 14 }}>
              2/<div style={{ display: "inline-block" }}>2</div>
            </System.P2>
          </>
        )}
      </OnboardingPopup>
    </div>
  );
}

function UploadSteps({ viewer, isMobile }) {
  const { currentStep, steps } = useUploadOnboardingContext();

  if (currentStep === steps.welcome) return <WelcomeOnboarding viewer={viewer} />;
  if (currentStep === steps.extension) return <ExtensionOnboarding isMobile={isMobile} />;
  if (currentStep === steps.trigger || currentStep === steps.jumper) return <UploadWalkthrough />;

  return null;
}

export function UploadOnboarding({ viewer, isMobile, onAction, children }) {
  return (
    <Provider viewer={viewer} onAction={onAction}>
      <UploadSteps viewer={viewer} isMobile={isMobile} />
      {children}
    </Provider>
  );
}
