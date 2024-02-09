import { promises as fs } from "fs";

export type Product = {
    id: string;
    name: string;
    description: string;
    apis: Api[];
}

export type Api = {
    id: string;
    name: string;
    description: string;
    openApiUrl: string;
    authentication: Auth | null;
    endpoints: Endpoint[];
    openEndpoints: Endpoint[];
}

export type Endpoint = {
    url: string;
}

export type Auth = {
    type: string;
    scopes: string[];
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const path = process.env.DATA || `${process.cwd()}/mock/products.json`;
    const file = await fs.readFile(path, "utf8");
    const products = JSON.parse(file) as Product[];
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}