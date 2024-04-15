import request from "supertest";
import { closeServer, app } from "../app";
import { findUserById, saveUser } from "../src/repositories/UserRepository";

let appServer;

beforeAll(() => {
  appServer = app.listen();
});

afterAll(() => {
  closeServer(appServer);
});

/* Assignment 1 & 2 */

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

/* Assignment 3 */

const firstName = "Jane";
const lastName = "Doe";
const strongPassword = "Abcd@123";
const email = "jane.doe@example.com";

const createBasicAuth = (username, password) => {
  return "Basic " + Buffer.from(username + ":" + password).toString("base64");
};

const userPath = "/v3/user";
const selfPath = "/self";

describe("Assignment 3 | Test 1 | Create User Account Success", () => {
  it("Expect correct user account creation", async () => {
    const createUserRequestBody = {
      first_name: firstName,
      last_name: lastName,
      password: strongPassword,
      username: email,
    };
    const createUserResponse = await request(app)
      .post(userPath)
      .send(createUserRequestBody);
    expect(createUserResponse.statusCode).toEqual(201);

    const createdUser = await findUserById(createUserResponse.body.id);
    createdUser.verified = true;
    await saveUser(createdUser);

    const fetchUserResponse = await request(app)
      .get(userPath + selfPath)
      .set("Authorization", createBasicAuth(email, strongPassword));
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
      .put(userPath + selfPath)
      .send(updateUserRequestBody)
      .set("Authorization", createBasicAuth(email, strongPassword));
    expect(updateUserResponse.statusCode).toEqual(204);

    const fetchUserResponse = await request(app)
      .get(userPath + selfPath)
      .set("Authorization", createBasicAuth(email, strongPassword));
    expect(fetchUserResponse.statusCode).toEqual(200);
    expect(fetchUserResponse.body.account_created).not.toEqual(
      fetchUserResponse.body.account_updated
    );
    expect(fetchUserResponse.body.first_name).toEqual(
      updateUserRequestBody.first_name
    );
    expect(fetchUserResponse.body.last_name).toEqual(
      updateUserRequestBody.last_name
    );
    expect(fetchUserResponse.body.username).toEqual(email);
  });
});
