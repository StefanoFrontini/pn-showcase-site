// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const IMAGES_PATH = process.env.NEXT_PUBLIC_IMAGES_PATH;

export const PA_PARTNERS_AND_INTERMEDIARIES_DOCUMENT_PATH =
  process.env.NEXT_PUBLIC_PA_PARTNERS_PATH;

export const PAGOPA_HOME = process.env.NEXT_PUBLIC_PAGOPA_HOME;
export const PAGOPA_HELP_EMAIL = process.env.NEXT_PUBLIC_PAGOPA_HELP_EMAIL;
export const SEND_PF_HELP_EMAIL =
  process.env.NEXT_PUBLIC_SEND_PF_HELP_EMAIL || "";

export const PN_PF_URL = process.env.NEXT_PUBLIC_PIATTAFORMA_NOTIFICHE_PF_URL;

export const PN_PG_URL = process.env.NEXT_PUBLIC_PIATTAFORMA_NOTIFICHE_PG_URL;

export const MANUALE_URL = "https://docs.pagopa.it/pn-manuale-operativo/";

const ONE_TRUST_DRAFT_MODE =
  process.env.NEXT_PUBLIC_ONE_TRUST_DRAFT_MODE === "true";

const ONE_TRUST_PP = process.env.NEXT_PUBLIC_ONE_TRUST_PP || "";
const ONE_TRUST_RADD = process.env.NEXT_PUBLIC_ONE_TRUST_RADD || "";
const NEXT_PUBLIC_ONE_TRUST_LEGAL_NOTICE =
  process.env.NEXT_PUBLIC_ONE_TRUST_LEGAL_NOTICE || "";

export const ONE_TRUST_PP_PAGE = `https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/${
  ONE_TRUST_DRAFT_MODE ? "draft/" : ""
}${ONE_TRUST_PP}.json`;
export const ONE_TRUST_RADD_TOS = `https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/${
  ONE_TRUST_DRAFT_MODE ? "draft/" : ""
}${ONE_TRUST_RADD}.json`;
export const ONE_TRUST_LEGAL_NOTICES_PAGE = `https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/${
  ONE_TRUST_DRAFT_MODE ? "draft/" : ""
}${NEXT_PUBLIC_ONE_TRUST_LEGAL_NOTICE}.json`;

export const PARTNER_AND_INTERMEDIARIES_PATH =
  "https://docs.pagopa.it/lista-partner-tecnologici-pn_pagopa-s.p.a./";

export const PERFEZIONAMENTO_PATH =
  process.env.NEXT_PUBLIC_PERFEZIONAMENTO_PATH;

export const ACCESSIBILITY_PARTICULAR_LINK = {
  LANDING_URL_PATTERN:
    process.env.NEXT_PUBLIC_ACCESSIBILITY_PARTICULAR_LANDING_URL_PATTERN,
  PARTICULAR_ACCESSIBILITY_URL:
    process.env.NEXT_PUBLIC_ACCESSIBILITY_PARTICULAR_ACCESSIBILITY_URL,
};
export const SEND_NUMBERS_SECTION_1 =
  "https://gist.githubusercontent.com/StefanoFrontini/b1f2a03d90dfeed356ba87463cda69e3/raw/c4ac908016af17e958dae241577a07d0471e8542/send-sezione1.json";

export const SEND_NUMBERS_SECTION_2 =
  "https://gist.githubusercontent.com/StefanoFrontini/6d1179031c54ff8da29afd577506a7ce/raw/737efca5d8b88d15a1bd365272cce84191cb2f14/send-sezione2.json";
