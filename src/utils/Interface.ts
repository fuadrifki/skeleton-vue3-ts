export interface ReportInterface {
  id: number;
  name: string;
  address: string;
  age: string;
  diseases: string;
  symptoms: SymptomsInterface[];
}

export interface SymptomsInterface {
  id: string;
  name: string;
}

export interface RuleInterface {
  id: string;
  name: string;
  isTrue: string;
  isFalse: string;
}
