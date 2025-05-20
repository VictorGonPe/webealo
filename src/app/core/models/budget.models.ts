// budget.models.ts
export interface Budget {
  id: string,
  name: string;
  phone: string;
  email: string;
  services: string[];
  pages: number;
  languages: number;
  total: number;
  addDate?: Date;
}
