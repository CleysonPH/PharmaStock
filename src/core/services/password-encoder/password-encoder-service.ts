export interface PasswordEncoderService {
  encode(password: string): Promise<string>
  matches(password: string, encodedPassword: string): Promise<boolean>
}
