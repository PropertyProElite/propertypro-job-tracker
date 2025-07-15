// auth.js

let auth0Client = null;

// These values will be populated from Netlify's environment variables.
const AUTH0_DOMAIN = 'dev-nijf265lqrhkp218.us.auth0.com'; 
const AUTH0_CLIENT_ID = 'impJEtMVSZHPmGqv5iUorqH2h7461Gjo'; 
const AUTH0_AUDIENCE = 'https://propertypro-elite-dashboard.netlify.app';

const configureClient = async () => {
  auth0Client = await auth0.createAuth0Client({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    authorizationParams: {
      audience: AUTH0_AUDIENCE,
      redirect_uri: window.location.origin,
    },
  });
};

const processLoginState = async () => {
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
    return true;
  }
  return false;
};

export const initAuth = async () => {
  await configureClient();
  await processLoginState();
  return await auth0Client.isAuthenticated();
};

export const login = async () => {
  await auth0Client.loginWithRedirect();
};

export const logout = async () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
};

export const getUser = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  if (!isAuthenticated) return null;
  return await auth0Client.getUser();
};

export const getToken = async () => {
  try {
    const token = await auth0Client.getTokenSilently();
    return token;
  } catch (error) {
    if (error.error === 'login_required' |

| error.error === 'consent_required') {
      await login();
    }
    console.error("Error getting token silently:", error);
    return null;
  }
};