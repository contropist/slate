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
    title: "Paul Prudence on Twitter: “Computers and Automation [August-12-2022]",
    Favicon: SVG.TwitterFavicon,
  },

  {
    title:
      "Massimo on Twitter: “This is how you cut a high voltage power line [source, full video by Joe Chenoweth: https://buff.ly/2lYgk5V]”",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
  {
    title: "qubibi on Twitter: “stardust https://t.co/3Uu6nOmsJyafq...”",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "pictures of the end on Twitter: “https://t.co/A2k7vZdIF7 / Twitter”",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "Internal Tech Emails on Twitter: “https://t.co/2uOQawmsvJ..”",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title: "𝗺𝗮𝗺𝗲 on Twitter: “京都でかわいい建物を発見しました🤖”",
    Favicon: SVG.TwitterFavicon,
  },
  {
    title:
      "Letterform Archive on Twitter: “La Carte surréaliste: La première série, 1937. (1) André Breton, Poème-Objet, (2) Georges Hugnet, Au pied de la Lettre, (3) René Magritte, La solution du rébus, (4)  Joan Miró, Horaire.”",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
  {
    title:
      "karatekid on Twitter: “Doubling down. Second @qubibien = art². And delight multiplied...”",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
  {
    title: "Concrete Architecture (@architeg) / Twitter",
    Favicon: SVG.TwitterFavicon,
    isSaved: true,
  },
];

export default function SpaceGuidePage() {
  return (
    <Guide
      title="Space Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/space"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Make space for everything"
      body="Set up spaces to automatically revisit things from your favorite sites or create your own using tags."
      next="search"
      prev="file"
      jumper={
        <React.Fragment>
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
                isSelected={i === 1}
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
        </React.Fragment>
      }
      mobileguide="../public/static/space.png"
    />
  );
}
