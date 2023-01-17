import * as React from "react";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { SecondaryTabGroup } from "~/components/core/TabGroup";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

import APIDocsGetV1 from "~/components/api-docs/v1/get";
import APIDocsGetSlateV1 from "~/components/api-docs/v1/get-slate.js";
import APIDocsUpdateSlateV1 from "~/components/api-docs/v1/update-slate.js";
import APIDocsUploadToSlateV1 from "~/components/api-docs/v1/upload.js";

import APIDocsGetV2 from "~/components/api-docs/v2/get";
import APIDocsGetSlateV2 from "~/components/api-docs/v2/get-slate.js";
import APIDocsUpdateSlateV2 from "~/components/api-docs/v2/update-slate.js";
import APIDocsUpdateFileV2 from "~/components/api-docs/v2/update-file.js";
import APIDocsUploadToSlateV2 from "~/components/api-docs/v2/upload.js";
import APIDocsCreateLinkV2 from "~/components/api-docs/v2/create-link.js";
import APIDocsCreateCollectionV2 from "~/components/api-docs/v2/create-collection.js";
import APIDocsUploadByCidV2 from "~/components/api-docs/v2/upload-by-cid.js";
import APIDocsUploadByUrlV2 from "~/components/api-docs/v2/upload-by-url.js";

import APIDocsGetV3 from "~/components/api-docs/v3/get";
import APIDocsGetSlateV3 from "~/components/api-docs/v3/get-slate.js";
import APIDocsUpdateSlateV3 from "~/components/api-docs/v3/update-slate.js";
import APIDocsUpdateFileV3 from "~/components/api-docs/v3/update-file.js";
import APIDocsUploadToSlateV3 from "~/components/api-docs/v3/upload.js";
import APIDocsCreateLinkV3 from "~/components/api-docs/v3/create-link.js";
import APIDocsCreateCollectionV3 from "~/components/api-docs/v3/create-collection.js";
import APIDocsUploadByCidV3 from "~/components/api-docs/v3/upload-by-cid.js";
import APIDocsUploadByUrlV3 from "~/components/api-docs/v3/upload-by-url.js";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

const STYLES_EXAMPLE = css`
  margin-bottom: 48px;
`;

const STYLES_SECTION_HEADER = css`
  margin-top: 48px;
  margin-bottom: 24px;
`;

export default class SceneSettingsDeveloper extends React.Component {
  _bucketCID;

  state = {
    loading: false,
    language: "javascript",
    docs: "GET",
    copying: false,
    modalShow: false,
  };

  _handleCopy = async () => {
    this._bucketCID.select();
    document.execCommand("copy");
    await this.setState({ copying: true });
    await Window.delay(1000);
    await this.setState({ copying: false });
  };

  _handleSave = async () => {
    this.setState({ loading: true });

    const response = await Actions.generateAPIKey();

    Events.hasError(response);

    this.setState({ loading: false });
  };

  _handleDelete = async (id) => {
    this.setState({ loading: true, modalShow: false });

    const response = await Actions.deleteAPIKey({ id });

    Events.hasError(response);

    this.setState({ loading: false });
  };

  _handleChangeLanguage = (newLanguage) => {
    this.setState({ language: newLanguage });
  };

  render() {
    const tab = this.props.page.params?.tab || "v3";
    let APIKey = "YOUR-API-KEY-HERE";
    let lang = this.state.language;
    if (this.props.viewer.keys) {
      if (this.props.viewer.keys.length) {
        APIKey = this.props.viewer.keys[0].key;
      }
    }

    let slateId = "YOUR-SLATE-ID-VALUE";
    if (this.props.viewer.slates) {
      if (this.props.viewer.slates.length) {
        slateId = this.props.viewer.slates[0].id;
      }
    }

    return (
      <WebsitePrototypeWrapper
        title={`${this.props.page.pageTitle} • Slate`}
        url={`${Constants.hostname}${this.props.page.pathname}`}
      >
        <ScenePage>
          {/*
        <div css={STYLES_SIDEBAR}>
          <span css={STYLES_LINK} onClick={() => this._changeDocs("INTRO")}>
            Introduction
          </span>
          <span css={STYLES_LABEL}>api</span>
          <div>
            <span
              css={STYLES_LINK}
              style={{ color: this.state.docs === "GET" ? Constants.system.blue : null }}
              onClick={() => this._changeDocs("GET")}
            >
              Get all slates
            </span>
            <span
              css={STYLES_LINK}
              style={{ color: this.state.docs === "GET_SLATE" ? Constants.system.blue : null }}
              onClick={() => this._changeDocs("GET_SLATE")}
            >
              Get slate by ID
            </span>
            <span
              css={STYLES_LINK}
              style={{
                color: this.state.docs === "UPLOAD_TO_SLATE" ? Constants.system.blue : null,
              }}
              onClick={() => this._changeDocs("UPLOAD_TO_SLATE")}
            >
              Upload to slate by ID
            </span>
            <span
              css={STYLES_LINK}
              style={{ color: this.state.docs === "UPDATE_SLATE" ? Constants.system.blue : null }}
              onClick={() => this._changeDocs("UPDATE_SLATE")}
            >
              Update slate
            </span>
          </div>
          <span css={STYLES_LABEL}>guides</span>
        </div>
        */}
          <ScenePageHeader title="Developer Documentation">
            Slate is currently on v3.0 of the API. While prior versions are still supported, we
            recommend using the most up to date version.
          </ScenePageHeader>

          <SecondaryTabGroup
            tabs={[
              { title: "Version 3.0", value: { tab: "v3" } },
              { title: "Version 2.0", value: { tab: "v2" } },
              { title: "Version 1.0", value: { tab: "v1" } },
            ]}
            value={tab}
            onAction={this.props.onAction}
          />

          {tab === "v3" ? (
            <>
              <System.H2 css={STYLES_SECTION_HEADER}>Get</System.H2>
              <APIDocsGetV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsGetSlateV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <System.H2 css={STYLES_SECTION_HEADER}>Update</System.H2>
              <APIDocsUpdateSlateV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUpdateFileV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <System.H2 css={STYLES_SECTION_HEADER}>Create</System.H2>
              <APIDocsCreateCollectionV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUploadToSlateV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUploadByCidV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUploadByUrlV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsCreateLinkV3
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
            </>
          ) : tab === "v2" ? (
            <>
              <System.H2 css={STYLES_SECTION_HEADER}>Get</System.H2>
              <APIDocsGetV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsGetSlateV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <System.H2 css={STYLES_SECTION_HEADER}>Update</System.H2>
              <APIDocsUpdateSlateV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUpdateFileV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <System.H2 css={STYLES_SECTION_HEADER}>Create</System.H2>
              <APIDocsCreateCollectionV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUploadToSlateV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUploadByCidV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsUploadByUrlV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsCreateLinkV2
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
            </>
          ) : (
            <>
              <System.H2 css={STYLES_SECTION_HEADER}>Read operations</System.H2>
              <APIDocsGetV1
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                onLanguageChange={this._handleChangeLanguage}
              />
              <APIDocsGetSlateV1
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <System.H2 css={STYLES_SECTION_HEADER}>Update operations</System.H2>
              <APIDocsUpdateSlateV1
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
              <System.H2 css={STYLES_SECTION_HEADER}>Create operations</System.H2>
              <APIDocsUploadToSlateV1
                cssValue={STYLES_EXAMPLE}
                language={lang}
                APIKey={APIKey}
                slateId={slateId}
                onLanguageChange={this._handleChangeLanguage}
              />
            </>
          )}
        </ScenePage>
      </WebsitePrototypeWrapper>
    );
  }
}
