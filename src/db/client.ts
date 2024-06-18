import { Client } from "pg";
import { ClientConfig } from "pg";

export const pgConfig: ClientConfig = {
    host: process.env.HOST,
    user: "postgres",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: +process.env.PORT,
    ssl: {
        rejectUnauthorized: false,
    },
};

export async function createClient() {
    const client = new Client(pgConfig);
      
    await client.connect();

    return client;
};
