import request from "supertest";
import { closeServer, app } from "../app";

let appServer;

beforeAll(() => {
  appServer = app.listen();
});

afterAll( () => {
  appServer.close();
});

describe("Assignment 1 | Test 1 | HealthCheck Sucess", () => {
  it("Expect 200 for success", async () => {
    const res = await request(app).get("/healthz");
    expect(res.statusCode).toEqual(200);
  });
});

describe("Assignment 1 | Test 2 | HealthCheck Different Method", () => {
  it("Expect 405 for invalid method", async () => {
    const res = await request(app).put("/healthz");
    expect(res.statusCode).toEqual(405);
  });
});

describe("Assignment 1 | Test 3 | HealthCheck Invalid Query Param", () => {
  it("Expect 400 for invalid query param", async () => {
    const res = await request(app).get("/healthz").query({ key: "value" });
    expect(res.statusCode).toEqual(400);
  });
});

const firstName = "Jane";
const lastName = "Doe";
const strongPassword = "Abcd@123";
const email = "jane.doe@example.com";

describe("Assignment 3 | Test 1 | Create User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const createUserRequestBody = {
      first_name: firstName,
      last_name: lastName,
      password: strongPassword,
      username: email,
    };
    const createUserResponse = await request(app)
      .post("/v1/user")
      .send(createUserRequestBody);
    expect(createUserResponse.statusCode).toEqual(201);

    const fetchUserResponse = await request(app)
      .get("/v1/user/self")
      .set(
        "Authorization",
        "Basic " + Buffer.from(email + ":" + strongPassword).toString("base64")
      );
    expect(fetchUserResponse.statusCode).toEqual(200);
    expect(fetchUserResponse.body.first_name).toEqual(firstName);
    expect(fetchUserResponse.body.last_name).toEqual(lastName);
    expect(fetchUserResponse.body.username).toEqual(email);
  });
});

describe("Assignment 3 | Test 2 | Update User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const updateUserRequestBody = {
      first_name: "Jack",
      last_name: "Din",
    };
    const updateUserResponse = await request(app)
      .put("/v1/user/self")
      .send(updateUserRequestBody)
      .set(
        "Authorization",
        "Basic " + Buffer.from(email + ":" + strongPassword).toString("base64")
      );
    expect(updateUserResponse.statusCode).toEqual(204);

    const fetchUserResponse = await request(app)
      .get("/v1/user/self")
      .set(
        "Authorization",
        "Basic " + Buffer.from(email + ":" + strongPassword).toString("base64")
      );
    expect(fetchUserResponse.statusCode).toEqual(200);
    expect(fetchUserResponse.body.first_name).toEqual(
      updateUserRequestBody.first_name
    );
    expect(fetchUserResponse.body.last_name).toEqual(
      updateUserRequestBody.last_name
    );
    expect(fetchUserResponse.body.username).toEqual(email);
  });
});
