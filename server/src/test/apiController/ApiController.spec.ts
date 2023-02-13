jest.setTimeout(60000);
import request from "supertest";
import app from "../../index";

describe("User access your home page and try to see the values fetched from the API", () => {
  it("try to fetch data from api usd_to_gbp", async () => {
    const res = await request(app).get("/api/usd_to_gbp");
    expect(res.statusCode).toBe(200);
  });

  it("pass wrong request to in URL usd_to_gbp", async () => {
    const res = await request(app).get("/api/usd_to_gbpWRONG");
    expect(res.statusCode).toBe(404);
  });

  it("try to fetch data from api gbp_to_usd", async () => {
    const res = await request(app).get("/api/gbp_to_usd");
    expect(res.statusCode).toBe(200);
  });

  it("pass wrong request to in URL /api/gbp_to_usd", async () => {
    const res = await request(app).get("/api/gbp_to_usdWRONG");
    expect(res.statusCode).toBe(404);
  });
});
