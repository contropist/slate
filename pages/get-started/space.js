import * as React from "react";
import * as Constants from "~/common/constants";

import Guide from "~/pages/get-started/guide.js";

import { css } from "@emotion/react";

export default function SpaceGuidePage() {
  return (
    <Guide
      title="Space Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/space"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="Customize your spaces"
      body="As you save and tag things, you can create spaces for your favorite tags and sites so your can easily jump between them."
      next="file"
      prev="tag"
    />
  );
}
