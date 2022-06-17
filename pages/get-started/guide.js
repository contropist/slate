import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsiteHeader from "~/components/core/WebsiteHeader";
import WebsiteFooter from "~/components/core/WebsiteFooter";
import * as JumperPrototype from "~/components/landing/jumperPrototype";

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

  @keyframes fade-in {
    0% {
      opacity: 0%;
      transform: translateY(30%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: fade-in 300ms ease-in-out;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.text};
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-bottom: 49px;

  @keyframes fade-in {
    0% {
      opacity: 0%;
      transform: translateY(50%);
    }
    50% {
      opacity: 0%;
      transform: translateY(50%);
    }
    100% {
      opacity: 100%;
      transform: translateY(0%);
    }
  }
  animation: fade-in 500ms ease-in-out;
`;

const STYLES_FLEX = css`
  position: absolute;
  bottom: 48px;
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const VIEWS_ACTIONS = [
  { label: "Current Window" },
  { label: "All Open Tabs" },
  { label: "Recent" },
];

const CUSTOM_VIEWS_ACTIONS = [
  { label: "Twitter", Favicon: SVG.TwitterFavicon },
  { label: "Youtube", Favicon: SVG.YoutubeFavicon },
];

const OBJECTS = [
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
  {
    title: "Paul Prudence on Twitter: Computers and Automation [August-12-2022]",
    isSelected: true,
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
];

const useGuideKeyCommands = (handleNext, handlePrev) => {
  console.log("ping");
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
        handleNext();
        break;
      case "ArrowLeft":
        handlePrev();
        break;
    }
  };
  useEventListener({ type: "keyup", handler: handleKeyUp });
};

const handleNext = () => {
  console.log("next");
};

const handlePrev = () => {
  console.log("prev");
};

export default function Guide(props) {
  useGuideKeyCommands();
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
          <JumperPrototype.TopPanel>
            {VIEWS_ACTIONS.map((action) => (
              <JumperPrototype.ViewAction key={action.label}>
                {action.label}
              </JumperPrototype.ViewAction>
            ))}
            <JumperPrototype.Divider
              height="none"
              width="1px"
              style={{ margin: "0px 4px", flexShrink: 0 }}
            />
            {CUSTOM_VIEWS_ACTIONS.map((action, i) => (
              <JumperPrototype.ViewAction
                isSelected={i === 0}
                key={action.label}
                Favicon={action.Favicon}
              >
                {action.label}
              </JumperPrototype.ViewAction>
            ))}
            <JumperPrototype.ViewAddButton style={{ marginLeft: "auto" }} />
          </JumperPrototype.TopPanel>
          <JumperPrototype.Root style={{ marginTop: 16 }}>
            <JumperPrototype.Header />
            <JumperPrototype.Divider />
            <JumperPrototype.Body>
              {OBJECTS.map((object) => (
                <JumperPrototype.Object
                  key={object.title}
                  title={object.title}
                  Favicon={object.Favicon}
                  isSelected={object.isSelected}
                  isSaved={object.isSaved}
                />
              ))}
            </JumperPrototype.Body>
          </JumperPrototype.Root>
          <div css={STYLES_FLEX}>
            <a css={STYLES_BUTTON} href={props.prev} style={{ marginRight: `12px` }}>
              <SVG.LeftArrow height={16} width={16} />
            </a>
            <a css={STYLES_BUTTON} href={props.next}>
              <SVG.RightArrow height={16} width={16} />
            </a>
          </div>
        </div>
      </div>
      <WebsiteFooter />
    </WebsitePrototypeWrapper>
  );
}
