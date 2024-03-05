interface IInfo {
  id: string;
  name: string;
  type?: string;
  value: string | number;
}

export interface IData {
  questions: IInfo[];
  calculations: IInfo[];
  urlParameters: IInfo[];
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  quiz: any;
  documents: any[];
}

export interface IFilterClause {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
}

export interface IResponse extends IData {
  submissionId: string;
  submissionTime: string;
}

export interface IOutput {
  responses: IResponse[];
  totalResponses: number;
  pageCount: number;
}
