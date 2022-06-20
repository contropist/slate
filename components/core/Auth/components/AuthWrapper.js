import * as React from "react";
import * as Utilities from "common/utilities";
import * as System from "~/components/system";
import * as Styles from "~/common/styles";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { FullHeightLayout } from "~/components/system/components/FullHeightLayout";

const AUTH_BACKGROUNDS = [
  `${Constants.gateways.ipfs}/bafybeigostprfkuuvuqlehutki32fnvshm2dyy4abqotmlffsca4f7qs7a`,
  `${Constants.gateways.ipfs}/bafybeicmokw3bl5six6u7eflbxcdblpgbx3fat24djrqg6n3hmbleidks4`,
  `${Constants.gateways.ipfs}/bafybeibkttaavlkjxgtafqndyrbgvwqcng67zvd4v36w7fvpajwmdgmxcu`,
  `${Constants.gateways.ipfs}/bafybeicpk7hkbeqdgbwkx3dltlz3akf3qbjpqgfphbnry4b6txnailtlpq`,
  `${Constants.gateways.ipfs}/bafybeibb2xknh3iwwetrro73hw3xfzjgwbi4n4c63wqmwt5hvaloqnh33u`,
  `${Constants.gateways.ipfs}/bafybeig4mij32vyda2jbh6zua3r2rkdpby6wtvninwgxvsejjdnls4wpc4`,
  `${Constants.gateways.ipfs}/bafybeihmoycn4a6zafd2k3fjcadskrxwvri5cwhabatzbyzteouh3s7igi`,
  `${Constants.gateways.ipfs}/bafybeigxssjsv3tmdhz4bj6vl2ca5c6rrhdkepw3mifvlllb7orpx5cfou`,
];

const backgroundIdx = Utilities.getRandomNumberBetween(0, AUTH_BACKGROUNDS.length - 1);
const backgroundUrl = AUTH_BACKGROUNDS[backgroundIdx];

const STYLES_AUTH_FOOTER = (theme) => css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED};
  position: fixed;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2px 24px;
  background-color: ${theme.semantic.bgWhite};
  & > * + * {
    margin-left: 24px;
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 2px 16px;
    justify-content: center;
    & > * + * {
      margin-left: 16px;
    }
  }

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: ${theme.semantic.bgBlurBlackTRN};
  }
  a {
    text-decoration: none;
    color: ${theme.semantic.textGrayLight};
  }
  a:hover {
    color: ${theme.semantic.textWhite};
  }
`;

export default function AuthWrapper({ children, ...props }) {
  return (
    <FullHeightLayout style={{ backgroundImage: `url(${backgroundUrl})` }} {...props}>
      {children}
      <footer css={STYLES_AUTH_FOOTER}>
        <System.H6 as="a" href="/terms">
          Terms of service
        </System.H6>
        <System.H6 as="a" href="/guidelines">
          Community guidelines
        </System.H6>
        <System.H6 as="a" href="https://discord.gg/NRsUjpCypr" target="_blank">
          Join Discord
        </System.H6>
      </footer>
    </FullHeightLayout>
  );
}
