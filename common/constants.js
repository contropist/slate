export const values = {
  version: "1.0.0",
  sds: "0.2.0",
};

export const sizes = {
  header: 52,
  navigation: 288,
  intercomWidget: 60,
  sidebar: 416,
  filterNavbar: 42,
  carouselMobileFooterHeight: 52,
  topOffset: 0, //NOTE(martina): Pushes UI down. 16 when there is a persistent announcement banner, 0 otherwise

  mobile: 768,
  tablet: 960,
  desktop: 1024,
};

export const system = {
  //system color
  white: "#FFFFFF",
  grayLight6: "#F7F8F9",
  grayLight5: "#E5E8EA",
  grayLight4: "#D1D1D6",
  grayLight3: "#C7CACC",
  grayLight2: "#AEB0B2",
  gray: "#8E8E93",
  grayDark2: "#636566",
  grayDark3: "#48494A",
  grayDark4: "#3A3B3C",
  grayDark5: "#2C2D2E",
  grayDark6: "#1C1D1E",
  black: "#00050A",

  blue: "hsl(208, 100%, 47.3%)",
  green: "#34D159",
  yellow: "#FFD600",
  red: "#FF4530",
  purple: "#585CE6",
  teal: "#64C8FA",
  pink: "#FF375F",
  orange: "hsl(24, 94.0%, 50.0%)",
  indigo: "hsl(226, 70.0%, 55.5%)",
  sky: "hsl(193, 77.9%, 53.9%)",
  lime: "hsl(76, 61.7%, 45.1%)",
  grass: "hsl(131, 41.0%, 46.5%)",
  mint: "hsl(168, 52.8%, 51.0%)",
  highlighter: "#E2FF59",

  // .mint {
  //   --mint1: hsl(165, 80.0%, 98.8%);
  //   --mint2: hsl(164, 88.2%, 96.7%);
  //   --mint3: hsl(164, 76.6%, 93.3%);
  //   --mint4: hsl(165, 68.8%, 89.5%);
  //   --mint5: hsl(165, 60.6%, 84.5%);
  //   --mint6: hsl(165, 53.5%, 76.9%);
  //   --mint7: hsl(166, 50.7%, 66.1%);
  //   --mint8: hsl(168, 52.8%, 51.0%);
  //   --mint9: hsl(167, 65.0%, 66.0%);
  //   --mint10: hsl(167, 59.3%, 63.1%);
  //   --mint11: hsl(172, 72.0%, 28.5%);
  //   --mint12: hsl(172, 70.0%, 12.0%);
  // }

  // .orange {
  //   --orange1: hsl(24, 70.0%, 99.0%);
  //   --orange2: hsl(24, 83.3%, 97.6%);
  //   --orange3: hsl(24, 100%, 95.3%);
  //   --orange4: hsl(25, 100%, 92.2%);
  //   --orange5: hsl(25, 100%, 88.2%);
  //   --orange6: hsl(25, 100%, 82.8%);
  //   --orange7: hsl(24, 100%, 75.3%);
  //   --orange8: hsl(24, 94.5%, 64.3%);
  //   --orange9: hsl(24, 94.0%, 50.0%);
  //   --orange10: hsl(24, 100%, 46.5%);
  //   --orange11: hsl(24, 100%, 37.0%);
  //   --orange12: hsl(15, 60.0%, 17.0%);
  // }

  // .indigo {
  //   --indigo1: hsl(225, 60.0%, 99.4%);
  //   --indigo2: hsl(223, 100%, 98.6%);
  //   --indigo3: hsl(223, 98.4%, 97.1%);
  //   --indigo4: hsl(223, 92.9%, 95.0%);
  //   --indigo5: hsl(224, 87.1%, 92.0%);
  //   --indigo6: hsl(224, 81.9%, 87.8%);
  //   --indigo7: hsl(225, 77.4%, 82.1%);
  //   --indigo8: hsl(226, 75.4%, 74.5%);
  //   --indigo9: hsl(226, 70.0%, 55.5%);
  //   --indigo10: hsl(226, 58.6%, 51.3%);
  //   --indigo11: hsl(226, 55.0%, 45.0%);
  //   --indigo12: hsl(226, 62.0%, 17.0%);
  // }

  // .sky {
  //   --sky1: hsl(193, 100%, 98.8%);
  //   --sky2: hsl(193, 100%, 97.3%);
  //   --sky3: hsl(193, 99.0%, 94.7%);
  //   --sky4: hsl(193, 91.4%, 91.4%);
  //   --sky5: hsl(194, 82.0%, 86.6%);
  //   --sky6: hsl(194, 74.1%, 79.5%);
  //   --sky7: hsl(194, 72.3%, 69.6%);
  //   --sky8: hsl(193, 77.9%, 53.9%);
  //   --sky9: hsl(193, 98.0%, 70.0%);
  //   --sky10: hsl(193, 87.0%, 66.5%);
  //   --sky11: hsl(195, 100%, 31.5%);
  //   --sky12: hsl(195, 100%, 13.0%);
  // }

  // .lime {
  //   --lime1: hsl(85, 50.0%, 98.7%);
  //   --lime2: hsl(85, 66.7%, 96.5%);
  //   --lime3: hsl(85, 76.0%, 92.3%);
  //   --lime4: hsl(84, 75.3%, 87.5%);
  //   --lime5: hsl(84, 71.5%, 81.9%);
  //   --lime6: hsl(82, 65.0%, 74.6%);
  //   --lime7: hsl(79, 53.2%, 61.8%);
  //   --lime8: hsl(76, 61.7%, 45.1%);
  //   --lime9: hsl(81, 67.0%, 50.0%);
  //   --lime10: hsl(80, 68.3%, 46.9%);
  //   --lime11: hsl(75, 80.0%, 26.0%);
  //   --lime12: hsl(78, 70.0%, 11.5%);
  // }

  // .grass {
  //   --grass1: hsl(116, 50.0%, 98.9%);
  //   --grass2: hsl(120, 60.0%, 97.1%);
  //   --grass3: hsl(120, 53.6%, 94.8%);
  //   --grass4: hsl(121, 47.5%, 91.4%);
  //   --grass5: hsl(122, 42.6%, 86.5%);
  //   --grass6: hsl(124, 39.0%, 79.7%);
  //   --grass7: hsl(126, 37.1%, 70.2%);
  //   --grass8: hsl(131, 38.1%, 56.3%);
  //   --grass9: hsl(131, 41.0%, 46.5%);
  //   --grass10: hsl(132, 43.1%, 42.2%);
  //   --grass11: hsl(133, 50.0%, 32.5%);
  //   --grass12: hsl(130, 30.0%, 14.9%);
  // }

  blueLight6: "#D5EBFF",
  blueLight5: "#AAD7FF",
  blueLight4: "#80C3FF",
  blueLight3: "#55AEFF",
  bluelight2: "#2B99FF",
  blueDark2: "#006FD5",
  blueDark3: "#0059AA",
  blueDark4: "#004380",
  blueDark5: "#002D55",
  blueDark6: "#00172B",

  greenLight6: "#D5FFDE",
  greenLight5: "#AAFFBE",
  greenLight4: "#86FCA2",
  greenLight3: "#66F287",
  greenLight2: "#4BE46F",
  greenDark2: "#20B944",
  greenDark3: "#119D32",
  greenDark4: "#067C22",
  greenDark5: "#005514",
  greenDark6: "#002B09",

  yellowLight6: "#FFFFD5",
  yellowLight5: "#FFFBAA",
  yellowLight4: "#FFF280",
  yellowLight3: "#FFE655",
  yellowLight2: "#FFD62B",
  yellowDark2: "#D5AC00",
  yellowDark3: "#AA9100",
  yellowDark4: "#807300",
  yellowDark5: "#555100",
  yellowDark6: "#2B2A00",

  redLight6: "#FFD5D5",
  redLight5: "#FFAFAA",
  redLight4: "#FF8D80",
  redlight3: "#FF715E",
  redLight2: "#FF5944",
  redDark2: "#D52E1A",
  redDark3: "#AA1C09",
  redDark4: "#800E00",
  redDark5: "#550500",
  redDark6: "#2B0000",
};

export const semantic = {
  //semantic color
  textWhite: system.white,
  textGrayLight: system.grayLight3,
  textGray: system.gray,
  textGrayDark: system.grayDark3,
  textBlack: system.black,

  bgWhite: system.white,
  bgLight: system.grayLight6,
  bgGrayLight: system.grayLight5,
  bgGrayLight4: system.grayLight4,
  bgBlurWhite: "rgba(255, 255, 255, 0.7)",
  bgBlurWhiteOP: "rgba(255, 255, 255, 0.85)",
  bgBlurWhiteTRN: "rgba(255, 255, 255, 0.3)",
  bgBlurLightTRN: "rgba(247, 248, 249, 0.3)",
  bgBlurLightOP: "rgba(247, 248, 249, 0.85)",
  bgBlurLight6: "rgba(247, 248, 249, 0.7)",
  bgBlurLight6OP: "rgba(247, 248, 249, 0.85)",
  bgBlurLight6TRN: "rgba(247, 248, 249, 0.3)",

  bgDark: system.grayDark6,
  bgLightDark: system.grayDark5,
  bgBlurBlack: "rgba(0, 5, 10, 0.5)",
  bgBlurBlackOP: "rgba(0, 5, 10, 0.85)",
  bgBlurBlackTRN: "rgba(0, 5, 10, 0.3)",
  bgBlurDark: "rgba(28, 29, 30, 0.7)",
  bgBlurDark6: "rgba(28, 29, 30, 0.5)",
  bgBlurDark6OP: "rgba(28, 29, 30, 0.85)",
  bgBlurDark6TRN: "rgba(28, 29, 30, 0.3)",

  borderLight: system.grayLight6,
  borderGrayLight: system.grayLight5,
  borderDark: system.grayDark6,
  borderGrayDark: system.grayDark5,
  borderGrayLight4: system.grayLight4,
  borderGray: system.gray,

  bgBlue: system.blueLight6,
  bgGreen: system.greenLight6,
  bgYellow: system.yellowLight6,
  bgRed: system.redLight6,
};

export const shadow = {
  lightSmall: "0px 4px 16px 0 rgba(174, 176, 178, 0.1)",
  lightMedium: "0px 8px 32px 0 rgba(174, 176, 178, 0.2)",
  lightLarge: "0px 12px 64px 0 rgba(174, 176, 178, 0.3)",
  darkSmall: "0px 4px 16px 0 rgba(99, 101, 102, 0.1)",
  darkMedium: "0px 8px 32px 0 rgba(99, 101, 102, 0.2)",
  darkLarge: "0px 12px 64px 0 rgba(99, 101, 102, 0.3)",
  card: "0px 0px 20px #E5E8EA;",
  jumperLight: "0px 16px 64px 0 rgba(99, 101, 102, 0.7)",
};

export const zindex = {
  navigation: 1,
  body: 2,
  intercom: 2,
  alert: 3,
  header: 4,
  sidebar: 5,
  modal: 6,
  jumper: 7,
  tooltip: 9,
  cta: 11,
};

export const font = {
  text: `'inter-regular', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  semiBold: `'inter-semi-bold', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  medium: `'inter-medium', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  bold: `'inter-bold', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  mono: `'mono', monaco, monospace`,
  monoBold: `'mono-bold', monaco, monospace`,
  monoCode: `'fira-code-regular', mono, monospace`,
  monoCodeBold: `'fira-code-bold', mono-bold, monospace`,
  code: `'jet-brains-regular', mono, monospace`,
  codeBold: `'jet-brains-bold', mono, monospace`,
};

export const typescale = {
  lvlN1: `0.75rem`,
  lvl0: `0.875rem`,
  lvl1: `1rem`,
  lvl2: `1.25rem`,
  lvl3: `1.563rem`,
  lvl4: `1.953rem`,
  lvl5: `2.441rem`,
  lvl6: `3.052rem`,
  lvl7: `3.815rem`,
  lvl8: `4.768rem`,
  lvl9: `5.96rem`,
  lvl10: `7.451rem`,
  lvl11: `9.313rem`,
};

export const theme = {
  foreground: system.white,
  ctaBackground: system.blue,
  pageBackground: semantic.bgLight,
  pageText: system.black,
};

export const gateways = {
  ipfs: "https://ipfs.io/ipfs",
};

export const hostname = "https://slate.host";

export const NFTDomains = ["foundation.app", "zora.co", "opensea.io"];

// more important filetypes to consider:
// midi
// txt, rtf, docx
// html, css, js, other code-related extensions
// json, csv, other script/data extensions
export const filetypes = {
  images: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/mpeg", "audio/aac", "audio/flac", "audio/wav", "audio/webm"],
  assets: ["font/ttf", "font/otf", "image/svg+xml"],
  videos: ["video/mpeg", "video/webm", "video/quicktime"],
  books: ["application/pdf", "application/epub+zip", "application/vnd.amazon.ebook"],
};

export const linkPreviewSizeLimit = 5000000; //NOTE(martina): 5mb limit for twitter preview images

// NOTE(amine): used to calculate how many cards will fit into a row in sceneActivity
export const grids = {
  activity: {
    profileInfo: {
      width: 260,
    },
  },
  object: {
    desktop: { width: 248, rowGap: 20 },
    mobile: { width: 166, rowGap: 12 },
  },
  collection: {
    desktop: { width: 382, rowGap: 16 },
    mobile: { width: 280, rowGap: 8 },
  },
  profile: {
    desktop: { width: 248, rowGap: 16 },
    mobile: { width: 248, rowGap: 8 },
  },
};

export const profileDefaultPicture = `${gateways.ipfs}/bafkreick3nscgixwfpq736forz7kzxvvhuej6kszevpsgmcubyhsx2pf7i`;

export const textile = {
  threadName: "buckets",
  mainBucket: "data",
  dealsBucket: "stage-deal",
};

export const extensionLink = {
  chrome: "https://chrome.google.com/webstore/detail/slate/gloembacbehhbfbkcfjmloikeeaebnoc",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/slate-for-firefox",
  safari: "",
};
