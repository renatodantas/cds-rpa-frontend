import { z } from 'zod';

const AutonomoSchema = z.object({
  id: z.number().nullable(),
  nome: z.string(),
  cpf: z.string(),
  banco: z.string().nullable(),
  agencia: z.number().nullable(),
  conta: z.string().nullable(),
  operacao: z.string().nullable(),
  pix: z.string().nullable(),
});

export type Autonomo = z.output<typeof AutonomoSchema>;

// export type UnsavedAutonomo = Omit<Autonomo, 'id'>;

export const AUTONOMO_DEFAULT_VALUE: Autonomo = Object.freeze({
  id: null,
  nome: '',
  cpf: '',
  banco: null,
  agencia: null,
  conta: null,
  operacao: null,
  pix: null,
});
