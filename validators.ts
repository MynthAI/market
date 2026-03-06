import { type } from "arktype";
import { InvalidArgumentError } from "commander";

const parseEmail = (value: string) => {
  const result = type("string.email")(value);

  if (result instanceof type.errors)
    throw new InvalidArgumentError(`email ${result.summary}`);

  return result;
};

export { parseEmail };
