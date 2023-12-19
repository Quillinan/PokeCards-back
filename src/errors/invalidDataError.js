export function invalidDataError(details) {
  return {
    name: "InvalidDataError",
    message: `Dados inválidos: ${details}`,
  };
}
