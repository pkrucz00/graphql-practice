import { describe } from "node:test";
import { expect, it, vi } from "vitest";
import queryWeather from "../queryWeather";
import * as sendRequest from "../sendRequest";
import {
  mockeedToday,
  responseInUS,
  responseInUsMapped,
  responseNotInUS,
  responseNotInUsMapped,
} from "./mockResponse";

vi.mock("../sendRequest");
vi.setSystemTime(mockeedToday);

describe("queryWeather", () => {
  it("should return weather data and set isInUsa to true", async () => {
    // given
    const property = {
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    };
    const expectedLocalizationQuery = "123 Main St, Springfield, IL, 62701";

    const sendRequestSpy = vi.spyOn(sendRequest, "default");
    sendRequestSpy.mockResolvedValue(responseInUS);

    // when
    const result = await queryWeather(property);

    // then
    expect(result).toEqual(responseInUsMapped);
    expect(sendRequestSpy).toHaveBeenCalledWith(expectedLocalizationQuery);
  });

  it("should return weather data and set isInUsa to false", async () => {
    // given
    const property = {
      city: "Toronto",
      state: "Canada",
      zip: "1444",
      street: "123 Main St",
    };
    const expectedLocalizationQuery = "123 Main St, Toronto, Canada, 1444";

    const sendRequestSpy = vi.spyOn(sendRequest, "default");
    sendRequestSpy.mockResolvedValue(responseNotInUS);

    // when
    const result = await queryWeather(property);

    // then
    expect(result).toEqual(responseNotInUsMapped);
    expect(sendRequestSpy).toHaveBeenCalledWith(expectedLocalizationQuery);
  });

  it("should throw an error if the weather API fails", async () => {
    // given
    const property = {
      city: "Springfield",
      state: "IL",
      zip: "62701",
      street: "123 Main St",
    };

    const sendRequestSpy = vi.spyOn(sendRequest, "default");
    sendRequestSpy.mockRejectedValue(new Error("Failed to send request"));

    // when
    const result = queryWeather(property);

    // then
    await expect(result).rejects.toThrow(
      "Error querying weather: Error: Failed to send request",
    );
  });
});
