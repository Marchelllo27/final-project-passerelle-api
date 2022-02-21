import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const expect = chai.expect;

describe("Users tests", async () => {
  before(async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      .set("x-api-key", process.env.API_KEY_ADMIN)
      .send()
      .then(res => {
        process.env.ADMIN_TOKEN = res.body.token;
      });

    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      .set("x-api-key", process.env.API_KEY_USER)
      .send()
      .then(res => {
        process.env.API_KEY_USER = res.body.token;
      });
  });

  // sans l'authentification basic
  it("find ALL users without being admin", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/admin/users")
      .send()
      .then(res => {
        expect(res).to.have.status(401);
      });
  });

  it("find ALL users if you are ADMIN", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/admin/users")
      .set("Authorization", "Bearer " + process.env.ADMIN_TOKEN)
      .send()
      .then(res => {
        expect(res).to.have.status(200);
      });
  });

  it("find ALL users if you are not ADMIN", async () => {
    // On commence par s'authentifier en non Admin
    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      .set("x-api-key", process.env.API_KEY_USER)
      .send()
      .then(async res => {
        if (typeof res.body.token !== "undefined") {
          // On tente de récupérer la liste des utilisateurs en ayant
          // un token valide mais pas les droits nécessaires (car USER et nécessite ADMIN).
          await chai
            .request(process.env.URL_TEST_API)
            .get("/users")
            .set("Authorization", "Bearer " + res.body.token)
            .send()
            .then(res => {
              expect(res).to.have.status(401);
            });
        }
      });
  });
});
