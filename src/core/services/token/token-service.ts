export interface TokenService {

  generateToken(subject: string): Promise<string>;
  getSubject(token: string): Promise<string>;

}
