import * as React from "react";
import * as Constants from "~/common/constants";
import * as JumperPrototype from "~/components/landing/jumperPrototype";
import * as SVG from "~/common/svg";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

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

export default function BrowserControlGuidePage() {
  return (
    <Guide
      title="Browser Control Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/browser-control"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Organize your internet browsing"
      body="It connects with your browser so you can easily see recent sites, all your open tabs, and everything in your current window at a glance."
      next="save"
      prev="../"
      jumper={
        <div>
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
        </div>
      }
    />
  );
}
