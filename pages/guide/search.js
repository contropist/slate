import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as JumperPrototype from "~/components/landing/jumperPrototype";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

const VIEWS_ACTIONS = [{ label: "Current Window" }, { label: "All Open" }, { label: "Recent" }];

const CUSTOM_VIEWS_ACTIONS = [
  { label: "Files" },
  { label: "Twitter", Favicon: SVG.TwitterFavicon },
  { label: "Reading", Favicon: SVG.Hash },
];

const OBJECTS = [
  {
    title: "Nicholas Negroponte Architecture Machine",
    Favicon: SVG.InternetArchiveFavicon,
  },
  {
    title: "Alexander, C., Notes on the Synthesis of Form",
    Favicon: SVG.Book,
    isSaved: true,
    tag: "computer-architecture",
  },
  {
    title: "Von Neumann Architecture - Computerphile",
    Favicon: SVG.YoutubeFavicon,
  },
  {
    title: "Shannon, C., “A Theory of Communications”",
    Favicon: SVG.Document,
    isSaved: true,
    tag: "computer-architecture",
  },
  {
    title: "Pask, G., “The Architectural Relevance of Cybernetics”",
    Favicon: SVG.TextDocument,
    isSaved: true,
    tag: "computer-architecture",
  },
  {
    title: "Michael Porter, “How Smart, Connected Products Are Transforming Competition”",
    Favicon: SVG.HBRFavicon,
  },
  {
    title: "Morozov, Evgeny (2014), “The Planning Machine: Project Cybersyn… Big Data…”",
    Favicon: SVG.NewYorkerFavicon,
  },
  {
    title:
      "no on Twitter: “An Introduction to Cybernetics (1956) : Ashby, W. Ross DOI: https://doi.org/10.2307/3006723”",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Capra, F., and Luisi, P. L., The Systems View of Life: A Unifying Vision",
    Favicon: SVG.Document,
    isSaved: true,
    tag: "computer-architecture",
  },
  {
    title:
      "Nimbu on Twitter: “📷 spaceintruderdetector: CYBERNETICS AND ITS DEVELOPMENT IN THE SOVIET UNION 1964 https://archive.org/details/DTIC_AD0602705/mode/2up The report is an introduction to the subject of cybernetics, with special reference to its origins and...”",
    Favicon: SVG.TwitterFavicon,
  },
];

export default function SearchGuidePage() {
  return (
    <Guide
      title="Search Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/search"
      image={`${Constants.gateways.ipfs}/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4`}
      heading="Find things instantly with search"
      body="Search allows you to easily find things by either keyword or tag (we’ve got some filters on the way too)."
      next="new-tab"
      prev="space"
      jumper={
        <React.Fragment>
          <JumperPrototype.TopPanel style={{ boxShadow: "none", opacity: "0.5" }}>
            {VIEWS_ACTIONS.map((action, i) => (
              <JumperPrototype.ViewAction isSelected={i === 2} key={action.label}>
                {action.label}
              </JumperPrototype.ViewAction>
            ))}
            <JumperPrototype.Divider
              height="none"
              width="1px"
              style={{ margin: "0px 4px", flexShrink: 0 }}
            />
            {CUSTOM_VIEWS_ACTIONS.map((action) => (
              <JumperPrototype.ViewAction key={action.label} Favicon={action.Favicon}>
                {action.label}
              </JumperPrototype.ViewAction>
            ))}
            <JumperPrototype.ViewAddButton style={{ marginLeft: "auto" }} />
          </JumperPrototype.TopPanel>
          <JumperPrototype.Root style={{ marginTop: 16 }}>
            <JumperPrototype.Header search="Computer architecture" />
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
        </React.Fragment>
      }
      mobileguide="../public/static/search.png"
    />
  );
}
