import type { Context, Config } from "@netlify/functions";

const SOCRATA_BASE_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

export default async (req: Request, context: Context) => {
  const incomingUrl = new URL(req.url);
  const targetUrl = `${SOCRATA_BASE_URL}${incomingUrl.search}`;

  const appToken = Netlify.env.get("SOCRATA_APP_TOKEN");

  const socrataResponse = await fetch(targetUrl, {
    headers: appToken ? { "X-App-Token": appToken } : {},
  });

  const body = await socrataResponse.text();

  return new Response(body, {
    status: socrataResponse.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const config: Config = {
  path: "/api/inspections",
};
