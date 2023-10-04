export type OrStringLiteral<T extends string | number> = T | `${T}`
