import { type } from "arktype";
import ky, { type KyInstance } from "ky";
import { Err, Ok } from "ts-handling";
import { getNetwork } from "./config.js";
import { AuthEndpoints, type Network } from "./endpoints.js";
import { RateLimited, ValidationErrorResponse } from "./responses/index.js";

class MarketApiClient {
  private readonly http: KyInstance;

  constructor(private readonly network: Network) {
    this.http = ky.create({
      throwHttpErrors: false,
      retry: { retryOnTimeout: true },
    });
  }

  async login(email: string, publicKey: string) {
    const endpoint = AuthEndpoints[this.network];
    const response = await this.http.post(`${endpoint}/login`, {
      json: { email, publicKey },
    });

    if (response.status > 299) return parseError(await response.json());
    return Ok();
  }

  async auth(email: string, code: string) {
    const endpoint = AuthEndpoints[this.network];
    const response = await this.http.post(`${endpoint}/auth`, {
      json: { email, code },
    });
    if (response.status !== 201) return parseError(await response.json());
    return Ok();
  }
}

const parseError = (data: unknown) => {
  const rateLimited = RateLimited(data);
  if (!(rateLimited instanceof type.errors)) {
    const seconds = rateLimited.contents.retryAfterSeconds;
    return Err(`Rate limited. Try again in ${seconds} seconds`);
  }

  const validationError = ValidationErrorResponse(data);
  if (validationError instanceof type.errors)
    return Err("Unknown " + JSON.stringify(data));

  return Err(
    validationError.contents.errors.map((error) => error.message).join("; "),
  );
};

const api = new MarketApiClient(getNetwork());

export { api };
