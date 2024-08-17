import App from './App';
import './index.scss';

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

const app = new App();

const webapp_id = process.env.WHOAMI_CANISTER_ID;

const webapp_idl = ({ IDL }) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};

export const init = ({ IDL }) => {
  return [];
};

// Wait for the DOM content to be fully loaded before executing any scripts
document.addEventListener("DOMContentLoaded", () => {
  let iiUrl;
  if (process.env.DFX_NETWORK === "local") {
    const iiUrl = `http://localhost:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai`;// Ensure localhost is used
  } else if (process.env.DFX_NETWORK === "ic") {
    iiUrl = `https://identity.ic0.app`; // Standard Internet Identity URL
  } else {
    iiUrl = `https://identity.dfinity.network`;
  }

  document.getElementById("iiUrl").value = iiUrl;

  document.getElementById("loginBtn").addEventListener("click", async () => {
    try {
      const authClient = await AuthClient.create();

      await new Promise((resolve, reject) => {
        authClient.login({
          identityProvider: iiUrl,
          onSuccess: resolve,
          onError: reject,
        });
      });

      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      const webapp = Actor.createActor(webapp_idl, {
        agent,
        canisterId: webapp_id,
      });

      const principal = await webapp.whoami();
      document.getElementById("loginStatus").innerText = principal.toText();
    } catch (error) {
      console.error("Login failed:", error);
      document.getElementById("loginStatus").innerText = "Login failed. Please try again.";
    }
  });
});
