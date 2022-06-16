import * as React from "react";
import * as Constants from "~/common/constants";

import Guide from "~/pages/get-started/guide.js";

import { css } from "@emotion/react";

export default function SaveGuidePage() {
  return (
    <Guide
      title="Save Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/save"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Quick save"
      body="You can easily save any webpage using a keyboard shortcut or through the app."
      next="tag"
      prev="browser-control"
    />
  );
}
