export type Spl = {
  spl_version: number;
  published_date: string;
  title: string;
  setid: string;
};

export type SplsResponse = {
  data: Spl[];
};

export type SplXmlJSONSection = {
  ID?: string;
  id: { root: string };
  code: { code: string; codeSystem: string; displayName: string };
  title?: string;
  effectiveTime: { value: string };
  excerpt?: unknown;
  text?: unknown;
  component?: {
    section: SplXmlJSONSection;
  }[];
};

export type SplXmlJSON = {
  document: {
    id: { root: string };
    code: { code: string; codeSystem: string; displayName: string };
    title: string;
    effectiveTime: { value: string };
    setId: { root: string };
    versionNumber: { value: string };
    component: {
      structuredBody: {
        component: {
          section: SplXmlJSONSection;
        }[];
      };
    };
  };
};
