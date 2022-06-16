import * as React from "react";
import * as Constants from "~/common/constants";

import Guide from "~/pages/get-started/guide.js";

import { css } from "@emotion/react";

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
    />
  );
}
