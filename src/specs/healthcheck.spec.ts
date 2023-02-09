import axios from "axios";
import { describe, it, expect } from "@jest/globals";

const baseUrl = "http://127.0.0.1:3000";

const flags = "/api/v0/settings/flags";
const announcements = "/api/v0/announcements";

describe("API Healthcheck", () => {
  it(`Should have status 200 for ${flags}`, async () => {
    await axios
      .get(baseUrl + flags)
      .then((response) => {
        console.log(response.data);
        expect(response.status).toBe(200);
      })
      .catch((error) => {
        console.log(`Failed with: ${error}`);
      });
  });

  it(`Should have status 200 for ${announcements}`, async () => {
    await axios
      .get(baseUrl + announcements)
      .then((response) => {
        console.log(response.data);
        expect(response.status).toBe(200);
      })
      .catch((error) => {
        console.log(`Failed with: ${error}`);
      });
  });
});
