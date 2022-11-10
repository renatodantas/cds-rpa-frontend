export const maskCpf = (cpf: string): string =>
  `${cpf.substring(0, 3)}.###.${cpf.substring(6, 9)}-##`;
