import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { APIRequest, expect, request, test } from "@playwright/test";
import dotenv from "dotenv";
import { pageFixture } from "./pagefixture";
dotenv.config();


export async function getTinyId() {
  const requestContext = await request.newContext();
  const response = await requestContext.get("/open_alerts", {
    headers: {
      Authorization: process.env.TOKEN!,
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  return body.alerts[0].tiny_id;
}

export async function getapi_token() {
  const requestContext = await request.newContext();
  const response = await requestContext.post(process.env.TOKEN_PATH!, {
    headers: {
      Accept: "application/json",
    },
    data: {
      grant_type: "password",
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRECT,
      audience: process.env.AUDIENCE,
    },
  });

  const body = await response.json();
  const token_value = body.access_token;
  const token_type = body.token_type;
  const token = token_type + " " + token_value;
  process.env.TOKEN = token;
}

export async function get_alerts_count() {
  const requestContext = await request.newContext();
  const response = await requestContext.get(
    process.env.API_URI + '/open_alerts',
    {
      headers: {
        Authorization: process.env.TOKEN!,
        "Content-Type": "application/json",
      },
    }
  )
  const body = await response.json();
  return body;
}

export async function verify_element_color(element: any, expected_color: any) {
  expect(await element).toHaveCSS('background-color', 'rgb(' + expected_color + ')')
}

