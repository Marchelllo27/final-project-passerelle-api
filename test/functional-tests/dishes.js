import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const expect = chai.expect;

// GET PRODUCTS

describe("TEST DISHES ROUTES", async () => {
  it("get all dishes", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/products/all-dishes")
      .send()
      .then(res => {
        expect(res).to.have.status(200);
      });
  });

  it("get dish by id", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/products/all-dishes")
      .send()
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});
