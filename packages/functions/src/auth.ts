import { AuthHandler, GoogleAdapter, Session } from "sst/node/auth";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

const clientID =
  "238024865915-eimf0shlgvia4ks5q2r89jt0omitlmtd.apps.googleusercontent.com";
// const clientSecret = "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";

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID,
      onSuccess: async (tokenset) => {
        console.log("TokenSet: ", JSON.stringify(tokenset.claims(), null, 4));
        const claims = tokenset.claims();
        return Session.parameter({
          redirect: "http://localhost:5173",
          type: "user",
          properties: {
            userID: claims.sub,
          },
        });
      },
    }),
  },
});
