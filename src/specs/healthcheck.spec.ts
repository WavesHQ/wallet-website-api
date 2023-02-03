import axios from "axios";
import { describe, it, expect } from '@jest/globals';

const baseUrl = "http://localhost:3000";

const flags = "/api/v0/settings/flags";
const announcements = "/api/v0/announcements";

describe("API Healthcheck", () => {
  it(`Should have status 200 for ${flags}`, () => {
        axios.get(baseUrl + flags)
        .then((response) => {
          expect(response.status).toBe(200);
        })
        .catch((error) => {
          console.log(`Failed with: ${error}`);
        });
  });
        
  it(`Should have status 200 for ${announcements}`, () => {
        axios.get(baseUrl + announcements)
        .then((response) => {
          expect(response.status).toBe(200);
            })
        .catch((error) => {
          console.log(`Failed with: ${error}`);
        });
  });
});
