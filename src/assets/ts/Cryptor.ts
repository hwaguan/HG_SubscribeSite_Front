export default class Cryptor {
  public decryptToken = (token: string) => {
    token = token.substring(5) + token.substring(0, 5)
    return (
      token.substring(Math.floor(token.length / 2)) +
      token.substring(0, Math.floor(token.length / 2))
    )
  }
}
