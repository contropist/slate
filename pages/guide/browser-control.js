import * as React from "react";
import * as Constants from "~/common/constants";
import * as JumperPrototype from "~/components/landing/jumperPrototype";
import * as SVG from "~/common/svg";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

const VIEWS_ACTIONS = [{ label: "Current Window" }, { label: "All Open" }, { label: "Recent" }];

const OBJECTS = [
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Fitzcarraldo 1982 Werner Herzog Klaus Kinski Full Movie HD",
    Favicon: SVG.YoutubeFavicon,
  },
  {
    title: "Amazon.com: Whole Foods Market",
    Favicon: SVG.AmazonFavicon,
  },
  {
    title: "NASA Is Working With Startups to Harvest the Moon’s Resources",
    Favicon: SVG.WSJFavicon,
  },
  {
    title: "SyntheticEvent - React",
    Favicon: SVG.ReactFavicon,
  },
  {
    title: "slate-engineering/slate-web-extension at @aminejv/history",
    Favicon: SVG.GithubFavicon,
  },
  {
    title: "Verticle ⋅ Mount Kimbie",
    Favicon: SVG.SpotifyFavicon,
  },
  {
    title: "tokyo travel restrictions 2022 - Google Search",
    Favicon: SVG.GoogleFavicon,
  },
];

export default function BrowserControlGuidePage() {
  return (
    <Guide
      title="Browser Control Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/browser-control"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Built for your browser"
      body="Our Chrome extension gives you seamless control of your tabs with powerful tools to help you manage and keep track of things."
      next="save"
      prev="../"
      jumper={
        <React.Fragment>
          <JumperPrototype.TopPanel>
            {VIEWS_ACTIONS.map((action, i) => (
              <JumperPrototype.ViewAction isSelected={i === 0} key={action.label}>
                {action.label}
              </JumperPrototype.ViewAction>
            ))}
            <JumperPrototype.ViewAddButton style={{ marginLeft: "auto" }} />
          </JumperPrototype.TopPanel>
          <JumperPrototype.Root style={{ marginTop: 16, boxShadow: "none", opacity: 0.5 }}>
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
        </React.Fragment>
      }
      mobileguide="../public/static/browser-control.png"
    />
  );
}
