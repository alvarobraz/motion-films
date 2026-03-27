/**
 * Contrato para serviços de criptografia e comparação de hashes.
 * Implementado na camada de Infra (ex: BcryptService).
 */
export interface IHashService {
  /**
   * Compara um texto puro com um hash criptografado.
   * @param plain Texto original (senha vinda do formulário)
   * @param hashed Hash armazenado no banco de dados
   */
  compare(plain: string, hashed: string): Promise<boolean>;

  /**
   * Gera um hash a partir de um texto puro.
   * @param plain Texto a ser criptografado
   */
  hash(plain: string): Promise<string>;
}

/**
 * Contrato para serviços de geração e manipulação de tokens (JWT).
 * Implementado na camada de Infra (ex: JwtService).
 */
export interface ITokenService {
  /**
   * Gera um token assinado a partir de um payload.
   * @param payload Objeto com os dados do usuário (id, email, etc)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generate(payload: Record<string, any>): Promise<string>;

  /**
   * Valida e decodifica um token existente.
   * @param token String do token JWT
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify(token: string): Promise<Record<string, any> | null>;
}
