/* eslint-disable max-len */
export const TranslationStatus = {
  UNKNOEN: 0,
  DONE: 1,
  REJECTED: 2,
  SENDEMAIL: 3
};

export const TranslationProject = {
  CRYPTOHUB: "xpay-crypto-hub",
  CRYPTOSHARED: "xpay-crypto-shared",
  CRYPTODRAWER: "xpay-crypto-drawer",
  ADS: "ads"
};

export const TranslationLocale = {
  ZHHANS: "zh-Hans",
  ID: "id",
  PRBR: "pt-BR"
};

export const LocaleStrings = {
  [TranslationLocale.ID]: "Indonesia",
  [TranslationLocale.PRBR]: "Brazilian Portuguese",
  [TranslationLocale.ZHHANS]: "Simplified Chinese"
};

export const TranslationProjectNames = {
  [TranslationProject.ADS]: "Ads",
  [TranslationProject.CRYPTOSHARED]: "Crypto Shared",
  [TranslationProject.CRYPTOHUB]: "Crypto Hub",
  [TranslationProject.CRYPTODRAWER]: "Crypto Drawer"
};

export const TranslationProjectDescrition = {
  [TranslationProject.ADS]: "Microsoft Ads is a digital marketing solution that helps you showcase your business and products to potential customers through search engine marketing",
  [TranslationProject.CRYPTOSHARED]: "A go-to payment platform for seamless online transactions",
  [TranslationProject.CRYPTOHUB]: "A go-to payment page in edge for seamless online transactions",
  [TranslationProject.CRYPTODRAWER]: "A go-to payment sub pane in edge for some domains for seamless online transactions"
};
