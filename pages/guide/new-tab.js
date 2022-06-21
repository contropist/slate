import * as React from "react";
import * as Constants from "~/common/constants";
import * as JumperPrototype from "~/components/landing/jumperPrototype";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

export default function NewTabGuidePage() {
  return (
    <Guide
      title="New Tab Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/new-tab"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Slate new tab"
      body="You can even use Slate as your new tab experience to refresh your memory as you browse."
      next="/get-slate"
      prev="search"
    />
  );
}
