import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

const webapp_id = process.env.WHOAMI_CANISTER_ID;

// The interface of the whoami canister
const webapp_idl = ({ IDL }) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};
export const init = ({ IDL }) => {
  return [];
};

// Autofills the <input> for the II Url to point to the correct canister.
document.body.onload = () => {
  let iiUrl;
 if (network === "local") {
    iiUrl = `http://localhost:8080/?canisterId=${internetIdentityCanisterId}`;
  } else if (network === "ic") {
    iiUrl = `https://${internetIdentityCanisterId}.ic0.app`;
  } else {
    iiUrl = `https://${internetIdentityCanisterId}.dfinity.network`;
  }
  document.getElementById("iiUrl").value = iiUrl;
};

document.getElementById("loginBtn").addEventListener("click", async () => {
  // When the user clicks, we start the login process.
  // First we have to create and AuthClient.
  const authClient = await AuthClient.create();

  // Find out which URL should be used for login.
  const iiUrl = document.getElementById("iiUrl").value;

  // Call authClient.login(...) to login with Internet Identity. This will open a new tab
  // with the login prompt. The code has to wait for the login process to complete.
  // We can either use the callback functions directly or wrap them in a promise.
  await new Promise((resolve, reject) => {
    authClient.login({
      identityProvider: iiUrl,
      onSuccess: resolve,
      onError: reject,
    });
  });

  // At this point we're authenticated, and we can get the identity from the auth client:
  const identity = authClient.getIdentity();
  // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
  const agent = new HttpAgent({ identity });
  // Using the interface description of our webapp, we create an actor that we use to call the service methods.
  const webapp = Actor.createActor(webapp_idl, {
    agent,
    canisterId: webapp_id,
  });
  // Call whoami which returns the principal (user id) of the current user.
  const principal = await webapp.whoami();
  // show the principal on the page
  document.getElementById("loginStatus").innerText = principal.toText();
});














import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

// Define the Internet Identity Canister ID
const internetIdentityCanisterId = process.env.CANISTER_ID_INTERNETIDENTITY_BACKEND;

// Define the interface for the webapp canister
const webappIdl = ({ IDL }) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};

// Automatically fill the Internet Identity URL based on the environment
document.body.onload = () => {
  let iiUrl;
  const network = process.env.DFX_NETWORK;

  if (network === "local") {
    iiUrl = `http://localhost:8080/?canisterId=${internetIdentityCanisterId}`;
  } else if (network === "ic") {
    iiUrl = `https://${internetIdentityCanisterId}.ic0.app`;
  } else {
    iiUrl = `https://${internetIdentityCanisterId}.dfinity.network`;
  }

  document.getElementById("iiUrl").value = iiUrl;
};

// Handle the login button click
document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    // Create the AuthClient instance
    const authClient = await AuthClient.create();
    const iiUrl = document.getElementById("iiUrl").value;

    // Start the login process
    await authClient.login({
      identityProvider: iiUrl,
      onSuccess: () => {
        console.log("Successfully logged in.");
      },
      onError: (err) => {
        console.error("Login failed:", err);
      },
    });

    // Once logged in, retrieve the user's identity
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    // Create the webapp actor using the defined interface
    const webapp = Actor.createActor(webappIdl, {
      agent,
      canisterId: internetIdentityCanisterId,
    });

    // Call the whoami method and display the principal ID
    const principal = await webapp.whoami();
    document.getElementById("principal").innerText = `Your Principal ID: ${principal.toText()}`;
  } catch (error) {
    console.error("Error during login process:", error);
  }
});

// Handle the Who Am I button click
document.getElementById("whoAmI").addEventListener("click", async () => {
  try {
    // Create the AuthClient instance
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    // Create the webapp actor using the defined interface
    const webapp = Actor.createActor(webappIdl, {
      agent,
      canisterId: internetIdentityCanisterId,
    });

    // Call the whoami method and display the principal ID
    const principal = await webapp.whoami();
    document.getElementById("principal").innerText = `Your Principal ID: ${principal.toText()}`;
  } catch (error) {
    console.error("Error during 'Who Am I' process:", error);
  }
});



