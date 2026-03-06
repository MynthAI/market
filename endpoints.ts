const AuthEndpoints = {
  local: "http://127.0.0.1:3036/api/auth",
  testnet: "https://preview.mynth.ai/api/auth",
  mainnet: "https://www.mynth.ai/api/auth",
};

const Networks = Object.keys(AuthEndpoints);
type Network = keyof typeof AuthEndpoints;

export { AuthEndpoints, Networks };
export type { Network };
