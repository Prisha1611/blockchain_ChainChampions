import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { internetidentity_backend } from "../../declarations/ICP/internetidentity/src/internetidentity_backend";

// Define constants
const internetIdentityCanisterId = 'be2us-64aaa-aaaaa-qaabq-cai'; 
const network = 'local'; 

// Define the interface for the webapp canister
const webappIdl = ({ IDL }) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};

// Set the Internet Identity URL based on the environment
document.addEventListener("DOMContentLoaded", () => {
  let iiUrl;

  if (network === "local") {
    iiUrl = `http://localhost:8080/?canisterId=${internetIdentityCanisterId}`;
  } else if (network === "ic") {
    iiUrl = `https://${internetIdentityCanisterId}.ic0.app`;
  } else {
    iiUrl = `https://${internetIdentityCanisterId}.dfinity.network`;
  }

  // Set the value of the hidden input
  document.getElementById("iiUrl").value = iiUrl;

  // Handle the login button click
  document.getElementById("loginBtn").addEventListener("click", async () => {
    try {
      // Create the AuthClient instance
      const authClient = await AuthClient.create();
      const iiUrl = document.getElementById("iiUrl").value;

      // Start the login process
      await new Promise((resolve, reject) => {
        authClient.login({
          identityProvider: iiUrl,
          onSuccess: resolve,
          onError: reject,
        });
      });

      // Once logged in, retrieve the user's identity
      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
2
      // Define the webapp canister ID
      const webappId = 'bd3sg-teaaa-aaaaa-qaaba-cai'; // Replace with your actual Canister ID

      // Create the webapp actor using the defined interface
      const webapp = Actor.createActor(webappIdl, {
        agent,
        canisterId: webappId,
      });

      // Call the whoami method and display the principal ID
      const principal = await webapp.whoami();
      document.getElementById("loginStatus").innerText = `Your Principal ID: ${principal.toText()}`;
    } catch (error) {
      console.error("Error during login process:", error);
      document.getElementById("loginStatus").innerText = `Error: ${error.message}`;
    }
  });
});
