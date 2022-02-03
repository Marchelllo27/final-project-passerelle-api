import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const expect = chai.expect;

describe("Authentication API Key", () => {
  // quand la clef existe
  it("with valid API key", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/auth")
      .set("x-api-key", process.env.API_KEY)
      .send()
      .then(res => {
        if(typeof res.body.token !== 'undefined') {
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
      .set("x-api-key", "0" + process.env.API_KEY.slice(1))
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
      .set("x-api-key", process.env.API_KEY.slice(1))
      .send()
      .then(res => {
        expect(res).to.have.status(400);
      });
  });
});

// GET PRODUCTS

describe("GET PRODUCTS", async () => {
  it("get all dishes", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/products/all-dishes")
      .send()
      .then(res => {
        expect(res).to.have.status(200);
      });
  });

  
});

// AUTHENTIFICATION BASIC

describe("Authentication Basic", async () => {
  // sans l'authentification basic
  it("find ALL users without being admin", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/users")
      .send()
      .then(res => {
        expect(res).to.have.status(401);
      });
  });

  it("find ALL users if you are ADMIN", async () => {
    await chai
      .request(process.env.URL_TEST_API)
      .get("/users")
      .set(
        "Authorization",
        "Bearer " + process.env.TOKEN
      )
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
      .set("x-api-key", '21T99BY-R36MMMM-HVVKZRX-1V4NXQN')
      .send()
      .then(async (res) => {
        if(typeof res.body.token !== 'undefined') {
            // On tente de récupérer la liste des utilisateurs en ayant 
            // un token valide mais pas les droits nécessaires (car USER et nécessite ADMIN).
            await chai
              .request(process.env.URL_TEST_API)
              .get("/users")
              .set(
                "Authorization",
                "Bearer " + res.body.token
              )
              .send()
              .then(res => {
                expect(res).to.have.status(401);
              });
        }
      });

  });

  // // quand le token n'existe pas
  // it("with non-existent token", async () => {
  //   await chai
  //     .request(process.env.URL_TEST_API)
  //     .get("/auth")
  //     // Je remplace le premier caractere de l'API key pour quelle n'existe pas
  //     .set(
  //       "Authorization",
  //       "Basic " + Buffer.from("cyrhades76@gmail.com:azerty").toString("base64")
  //     )
  //     .send()
  //     .then(res => {
  //       expect(res).to.have.status(401);
  //     });
  // });

  // // quand la clef n'est pas correcte
  // it('with correct Basic auth', async () => {
  //     await chai.request(process.env.URL_TEST_API)
  //         .get('/auth')
  //         // Je retire le premier caractere de l'API key pour quelle soit incorrecte
  //         .set('Authorization', 'Basic '+Buffer.from('cyrhades76@gmail.com:123456').toString('base64'))
  //         .send()
  //         .then((res) => {
  //             expect(res).to.have.status(200);
  //         });
  // });
});
