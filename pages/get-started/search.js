import * as React from "react";
import * as Constants from "~/common/constants";

import Guide from "~/pages/get-started/guide.js";

import { css } from "@emotion/react";

export default function SearchGuidePage() {
  return (
    <Guide
      title="Search Guide - Slate"
      description="Your personal search engine"
      url="https://slate.host/guide/search"
      image="https://slate.textile.io/ipfs/bafkreifww37ypduoi5pvj2cuikz7iycp7l5h7czke6lcboukkaqkoab3t4"
      heading="One place to search it all"
      body="Search allows you to easily find things by either keyword or tag (we’ve got some filters on the way too)."
      next="new-tab"
      prev="file"
    />
  );
}
