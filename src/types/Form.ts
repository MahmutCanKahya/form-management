export interface IForm {
  name: string;
  description: string;
  createdAt: string;
  fields: IField[];
}

export interface IField {
  required: boolean;
  name: string;
  dataType: DataType | undefined;
}

export enum DataType {
  "STRING" = "STRING",
  "NUMBER" = "NUMBER",
}
