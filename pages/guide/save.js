import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as JumperPrototype from "~/components/landing/jumperPrototype";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

const VIEWS_ACTIONS = [{ label: "Current Window" }, { label: "All Open" }, { label: "Recent" }];

const OBJECTS = [
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
    tag: "architecture",
  },
  {
    title: "Fitzcarraldo 1982 Werner Herzog Klaus Kinski Full Movie HD",
    Favicon: SVG.YoutubeFavicon,
    isSelected: true,
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
    isSaved: true,
    tag: "code",
  },
  {
    title: "slate-engineering/slate-web-extension at @aminejv/history",
    Favicon: SVG.GithubFavicon,
    isSaved: true,
    tag: "slate",
  },
  {
    title: "Verticle ⋅ Mount Kimbie",
    Favicon: SVG.SpotifyFavicon,
    isSaved: true,
    tag: "work-music",
  },
  {
    title: "tokyo travel restrictions 2022 - Google Search",
    Favicon: SVG.GoogleFavicon,
  },
];

export default function SaveGuidePage() {
  return (
    <Guide
      title="Save Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/save"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Always at your fingertips"
      body="Save links, take notes, and add tags with keyboard shortcuts to capture things on the fly."
      next="file"
      prev="browser-control"
      jumper={
        <div>
          <JumperPrototype.TopPanel style={{ boxShadow: "none", opacity: "0.5" }}>
            {VIEWS_ACTIONS.map((action, i) => (
              <JumperPrototype.ViewAction isSelected={i === 0} key={action.label}>
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
                  tag={object.tag}
                />
              ))}
            </JumperPrototype.Body>
          </JumperPrototype.Root>
        </div>
      }
      mobileguide="../public/static/save.png"
    />
  );
}
