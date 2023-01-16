import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as JumperPrototype from "~/components/landing/jumperPrototype";

import Guide from "~/pages/guide/guide.js";

const VIEWS_ACTIONS = [{ label: "Current Window" }, { label: "All Open" }, { label: "Recent" }];

const CUSTOM_VIEWS_ACTIONS = [{ label: "Files" }];

const OBJECTS = [
  {
    title: "Alexander, C., Notes on the Synthesis of Form",
    Favicon: SVG.Book,
    isSaved: true,
    tag: "computer-architecture",
  },
  {
    title: "Graphical database interface",
    Favicon: SVG.Image,
    isSaved: true,
  },
  {
    title: "Landscape in the Mist",
    Favicon: SVG.Video,
    isSaved: true,
    tag: "theo-angelopoulos",
  },
  {
    title: "Shannon, C., “A Theory of Communications”",
    Favicon: SVG.Document,
    isSaved: true,
    tag: "computer-architecture",
  },
  {
    title: "Retro computer fonts",
    Favicon: SVG.TextDocument,
    isSaved: true,
  },
  {
    title: "Prime number ASMR",
    Favicon: SVG.Sound,
    isSaved: true,
  },
  {
    title: "Hesse, H., Demian",
    Favicon: SVG.Book,
    isSaved: true,
    tag: "reading",
  },
  {
    title: "Pask, G., “The Architectural Relevance of Cybernetics”",
    Favicon: SVG.TextDocument,
    isSaved: true,
    tag: "computer-architecture",
  },
];

export default function FileGuidePage() {
  return (
    <Guide
      title="File Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/file"
      image={`${Constants.gateways.ipfs}/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4`}
      heading="Integrated storage for your files"
      body="Save text, images, and files from the web or upload them directly to Slate to create your personal archive."
      next="space"
      prev="save"
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
                  tag={object.tag}
                />
              ))}
            </JumperPrototype.Body>
          </JumperPrototype.Root>
        </div>
      }
      mobileguide="../public/static/file.png"
    />
  );
}
