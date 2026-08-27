declare module "ola" {
  export type OlaScalar = { value: number };
  export default function Ola(value: number, time?: number): OlaScalar;
}
