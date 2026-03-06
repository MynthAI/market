import { type } from "arktype";
import { generateKeyPair } from "crypto";
import { promisify } from "util";

const generateKeyPairAsync = promisify(generateKeyPair);

const Ed25519PublicJwk = type({ x: "string" });

const generateKeys = async () => {
  const { publicKey, privateKey } = await generateKeyPairAsync("ed25519");
  const jwk = Ed25519PublicJwk.assert(publicKey.export({ format: "jwk" }));
  const publicKeyBytes = Buffer.from(jwk.x, "base64url");
  return { public: publicKeyBytes.toString("hex"), private: privateKey };
};

export { generateKeys };
