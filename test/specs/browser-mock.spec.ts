const executeUrl =
  "https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks?action=getData";

describe("API tests", () => {
  it("receive data sucessfully", async () => {
    const response = await fetch(executeUrl);
    expect(response.status).toBe(200);
  });

  it("Response body success message", async () => {
    const response = await fetch(executeUrl);
    const body = await response.json();
    expect(body.message).toBe("Success! Expected data received.");
  });

  it("Mock bad requests error 500", async () => {
    await browser.navigateTo(
      "https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks",
    );
    const mock = await browser.mock(executeUrl);

    mock.respond(
      { message: "Network error" },
      { statusCode: 500, headers: { "Content-Type": "application/json" } },
    );

    await $("#fetchBtn").click();

    await expect(mock).toBeRequested();

    const message = $("#result");
    await expect(message).toHaveText("Network error", { containing: true });
  });
});
