import { AuthClient } from "@dfinity/auth-client";

const IDENTITY_PROVIDER = `http://localhost:8000/?canisterId=${
  import.meta.env.VITE_IDENTITY_CANISTER_ID
}`;

const DEPLOYED_PROVIDER = `https://identity.ic0.app/#authorize?canisterId=${
  import.meta.env.VITE_IDENTITY_CANISTER_ID
}`;

const MAX_TTL = 7 * 24 * 60 * 60 * 1000 * 1000 * 1000;

export async function getAuthClient() {
  return await AuthClient.create();
}

export async function getPrincipal() {
  const authClient = await getAuthClient();
  return authClient.getIdentity()?.getPrincipal();
}

export async function getPrincipalText() {
  return (await getPrincipal()).toText();
}

let authChecked = false;

export async function isAuthenticated() {
  if (authChecked) {
    return true; // or return the previously stored auth status
  }
  try {
    const authClient = await getAuthClient();
    const isAuth = await authClient.isAuthenticated();
    authChecked = true; // set the flag to prevent repeated checks
    return isAuth;
  } catch (err) {
    logout();
  }
}

export async function login() {
  const authClient = await getAuthClient();
  const isAuthenticated = await authClient.isAuthenticated();
  if (!isAuthenticated) {
    await authClient?.login({
      identityProvider: DEPLOYED_PROVIDER,
      onSuccess: async () => {
        window.location.reload();
      },
      maxTimeToLive: MAX_TTL,
    });
  }
}

export async function logout() {
  const authClient = await getAuthClient();
  authClient.logout();
  window.location.reload();
}
