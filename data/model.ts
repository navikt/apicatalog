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