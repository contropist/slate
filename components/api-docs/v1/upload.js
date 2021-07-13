import * as React from "react";
import * as System from "~/components/system";

import CodeBlock from "~/components/system/CodeBlock";

const EXAMPLE_CODE_JS = (key) => `const url = 'https://uploads.slate.host/api/public';

let file = e.target.files[0];
let data = new FormData();
data.append("data", file);

const response = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: 'Basic ${key}', // API key
  },
  body: data
});`;

const EXAMPLE_CODE_PY = (key) => `import requests

url = "https://uploads.slate.host/api/public"
files = {
  "file": open("example-file.txt", "rb")
}
headers = {
  "Authorization": "Basic ${key}" # API key
}

r = requests.post(url, headers=headers, files=files)`;

const SLATE_EXAMPLE_CODE_JS = (
  key,
  slateId
) => `const url = 'https://uploads.slate.host/api/public/${slateId}'; // collection ID

let file = e.target.files[0];
let data = new FormData();
data.append("data", file);

const response = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: 'Basic ${key}', // API key
  },
  body: data
});`;

const SLATE_EXAMPLE_CODE_PY = (key, slateId) => `import requests

url = "https://uploads.slate.host/api/public/${slateId}" # collection ID. Omit this to just upload without adding to a specific collection
files = {
  "file": open("example-file.txt", "rb")
}
headers = {
  "Authorization": "Basic ${key}" # API key
}

r = requests.post(url, headers=headers, files=files)`;

export default class APIDocsUploadToSlate extends React.Component {
  render() {
    let language = this.props.language;
    let key = this.props.APIKey;
    let slateId = this.props.slateId;

    let uploadCode = {
      javascript: EXAMPLE_CODE_JS(key),
      python: EXAMPLE_CODE_PY(key),
    };
    let slateUploadCode = {
      javascript: SLATE_EXAMPLE_CODE_JS(key, slateId),
      python: SLATE_EXAMPLE_CODE_PY(key, slateId),
    };
    return (
      <React.Fragment>
        <System.DescriptionGroup
          style={{ maxWidth: 640, marginTop: 48, ...this.props.style }}
          label="Upload"
          description={
            "This API endpoint allows you to upload a file to your data. This uses our data transfer microservice to interact with Textile Buckets and upload data to the IPFS/Filecoin network."
          }
        />
        <CodeBlock
          children={uploadCode}
          style={{ maxWidth: "820px" }}
          language={language}
          title="Upload"
          multiLang="true"
          onLanguageChange={this.props.onLanguageChange}
        />
        <br />
        <CodeBlock
          children={slateUploadCode}
          style={{ maxWidth: "820px" }}
          language={language}
          title="Upload to collection"
          multiLang="true"
          onLanguageChange={this.props.onLanguageChange}
        />
      </React.Fragment>
    );
  }
}
