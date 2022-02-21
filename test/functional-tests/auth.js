import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const expect = chai.expect;

describe("Authentication API Key", async () => {

  // quand la clef existe
  it("with valid API key", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      .set("x-api-key", process.env.API_KEY_USER)
      .send()
      .then(res => {
        if (typeof res.body.token !== "undefined") {
          process.env.TOKEN = res.body.token;
        }
        expect(res).to.have.status(200);
      });
  });

  // quand la clef n'existe pas
  it("with incorrect API key", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      // Je remplace le premier caractere de l'API key pour quelle n'existe pas
      .set("x-api-key", "9" + process.env.API_KEY_USER.slice(1))
      .send()
      .then(res => {
        expect(res).to.have.status(400);
      });
  });

  // quand la clef n'est pas correcte
  it("with invalid API key", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      // Je retire le premier caractere de l'API key pour quelle soit incorrecte
      .set("x-api-key", process.env.API_KEY_USER.slice(1))
      .send()
      .then(res => {
        expect(res).to.have.status(400);
      });
  });
});