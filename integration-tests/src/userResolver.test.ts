import { gql } from "@apollo/client/core";
import client from "./apolloClient";

const createUserMutation = gql`
  mutation CreateUser($data: SigninInput!) {
    createUser(data: $data) {
      id
      email
      premium
      role
    }
  }
`;

// const readUsersQuery = gql`
//   query Users {
//     users {
//       id
//       name
//     }
//   }
// `;

const loginUser = gql`
  mutation LoginUser($data: LoginInput!) {
    loginUser(data: $data) {
      email
      password
    }
  }
`;

describe("User resolver", () => {
  describe("create user", () => {
    it("should create user given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: {
          data: {
            name: "testName",
            mail: "mail@mail.fr",
            password: "Azerty123",
          },
        },
      });

      expect(res.data?.createUser).toHaveProperty("id");
    });

    xit("should not create user given invalid attributes and return an error", async () => {
      expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: { data: { mail: "mail@mail.fr", password: "" } },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
    });
  });

  describe("read users", () => {
    xit("should return an authentification token", async () => {
      const res = await client.mutate({
        mutation: loginUser,
        variables: { data: { email: "mail@mail.fr", password: "Azerty123" } },
      });

      const token = res?.data?.loginUser;
      expect(token).toBeDefined();
    });
  });
});
