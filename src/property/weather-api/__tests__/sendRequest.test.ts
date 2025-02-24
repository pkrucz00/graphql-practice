import axios from "axios";
import { describe, expect, it, vitest } from "vitest";
import sendRequest from "../sendRequest";
import { responseInUS } from "./mockResponse";

const TEST_URL = process.env.WEATHER_API_URL;
const TEST_KEY = process.env.WEATHER_API_KEY;

describe("sendRequest", () => {
  it("should send a request", async () => {
    // given
    const location = "Springfield, IL";
    const response = responseInUS;
    const axiosSpy = vitest.spyOn(axios, "get");
    axiosSpy.mockResolvedValue({ data: response });

    // when
    const result = await sendRequest(location);

    // then
    expect(result).toEqual(response);
    expect(axiosSpy).toHaveBeenCalledWith(
      `${TEST_URL}/current?access_key=${TEST_KEY}`,
      {
        params: {
          query: location,
        },
      },
    );
  });

  it("should throw an error if request fails", async () => {
    // given
    const location = "Springfield, IL";
    const axiosSpy = vitest.spyOn(axios, "get");
    axiosSpy.mockRejectedValue(new Error("Failed to send request"));

    // when
    const result = sendRequest(location);

    // then
    await expect(result).rejects.toThrow(
      "Error querying weather: Error: Failed to send request",
    );
  });
});
