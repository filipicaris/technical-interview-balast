export type DatabaseConfiguration = {
  host: string;
  port: number;
  database: string;
  username: string;
  password?: string;
  schema?: string;
  ssl?: boolean;
  logging?: boolean;
};
