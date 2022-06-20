import * as React from "react";
import * as Constants from "~/common/constants";

import Guide from "~/pages/guide/guide.js";

import { css } from "@emotion/react";

export default function TagGuidePage() {
  return (
    <Guide
      title="Tag Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/tag"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Tag on the fly"
      body="Tags can be added to anything you save to help you organize things further."
      next="space"
      prev="save"
    />
  );
}
