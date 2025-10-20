const { Client } = require("@elastic/elasticsearch");
import type { EmailDocument, EmailSearchQuery } from "../types/esConnect";
import type { Request, Response } from "express";
const express = require("express");
const emailRouter = express.Router();
require("dotenv").config();
const {loadAccounts} = require('../utils/loadAccounts')

const esClient = new Client({
    node: process.env.ELASTIC_URL || "",
});

emailRouter.get(
    "/emails/search",
    async (
        req: Request<
            {},
            {},
            {},
            EmailSearchQuery & { page?: string; pageSize?: string }
        >,
        res: Response
    ) => {
        const { q, account, folder, page, pageSize } = req.query;

        const filters: Record<string, any>[] = [];
        if (account) filters.push({ term: { accountId: account } });
        if (folder) filters.push({ term: { folder } });

        const query = {
            bool: {
                must: q
                    ? [{ multi_match: { query: q, fields: ["subject", "body"] } }]
                    : [],
                filter: filters,
            },
        };

        const size = parseInt(pageSize || "10", 10);
        const from = (parseInt(page || "1", 10) - 1) * size;

        const result = (await esClient.search({
            index: "emails",
            query,
            size,
            from,
            sort: [{ date: { order: "desc" } }],
        })) as {
            hits: { hits: { _source: EmailDocument }[] };
        };

        res.json(result.hits.hits.map((hit) => hit._source));
    }
);

emailRouter.get(
    "/emails",
    async (
        req: Request<{}, {}, {}, { page?: string; pageSize?: string }>,
        res: Response
    ) => {
        const { page, pageSize } = req.query;

        const size = parseInt(pageSize || "10", 10);
        const from = (parseInt(page || "1", 10) - 1) * size;

        const result = (await esClient.search({
            index: "emails",
            query: { match_all: {} },
            size,
            from,
            sort: [{ date: { order: "desc" } }],
        })) as {
            hits: { hits: { _source: EmailDocument }[] };
        };

        res.json(result.hits.hits.map((hit) => hit._source));
    }
);

emailRouter.get('/accounts', async (req:Request, res:Response) => {
  const accounts = loadAccounts();
  res.json(accounts);
});

module.exports = emailRouter;
