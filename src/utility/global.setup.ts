import { FullConfig, request } from '@playwright/test';
import { getapi_token } from './common.api';


async function globalSetup(_config: FullConfig) {
  console.log('USERNAME', process.env.USERNAME)
  
  const baseURL = 'https://habitat-energy-development.eu.auth0.com/';
  const url = 'oauth/token';
  const requestContext = await request.newContext();
  const response = await requestContext.post(`${baseURL}${url}`, {
    headers: {
      'Accept': 'application/json',
    },
    data: {
      grant_type: "password",
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRECT,
      audience: process.env.AUDIENCE
    }
  });

  const body = await response.json();
  const token_value = body.access_token
  const token_type = body.token_type
  const token = token_type + ' ' + token_value
  process.env.TOKEN = token;
  console.log(token)

}

export default globalSetup;