export function maskCpf(cpf: string): string {
  return `${cpf.substring(0, 3)}.###.${cpf.substring(6, 9)}-##`;
}
