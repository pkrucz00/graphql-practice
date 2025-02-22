import { expect, test } from "vitest";

test("fail", () => {
  const fail =
    (![] + [])[+[]] + // f
    (![] + [])[+!+[]] + // a
    ([![]] + [][[]])[+!+[] + [+[]]] + // i
    (![] + [])[!+[] + !+[]]; // l

  expect(fail).toEqual("fail");
});
