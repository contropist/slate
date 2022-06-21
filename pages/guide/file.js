import * as React from "react";
import * as Constants from "~/common/constants";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

export default function FileGuidePage() {
  return (
    <Guide
      title="File Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/file"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Files and links in one place"
      body="In addition to links, Slate includes integrated storage that allows you to upload files and clip things from the web."
      next="search"
      prev="space"
    />
  );
}
