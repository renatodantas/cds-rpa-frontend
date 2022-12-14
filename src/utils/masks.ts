import dayjs from 'dayjs';

export function maskCpf(cpf: string): string {
  return `${cpf.substring(0, 3)}.***.${cpf.substring(6, 9)}-**`;
}

export function maskDate(date: string) {
  return dayjs(date).toLocaleString();
}

export function maskCurrency(value?: number | null) {
  return value?.toLocaleString('pt-br', { minimumFractionDigits: 2 }) || '';
}
