// budget.models.ts
export interface Budget {
  clientName: string;
  phone: string;
  email: string;
  services: string[];
  numPages: number;
  numLanguages: number;
  total: number;
}
