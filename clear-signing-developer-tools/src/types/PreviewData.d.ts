export type PreviewData = {
  type: "transaction" | "message";
  metadata: {
    owner: string;
    info: {
      legalName: string;
      lastUpdate: string;
      url: string;
    };
  };
  operations: [Operation, ...Operation[]];
};

interface Operation {
  intent: string;
  displays: DisplayItem[];
}

interface DisplayItem {
  label: string;
  displayValue: string;
}
