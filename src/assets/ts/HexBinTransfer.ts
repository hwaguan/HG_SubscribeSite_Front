export default class HexBinTransfer {
  constructor() {}

  public Bin2Hex = (str: string) => {
    const a = []
    str += ''

    for (let i = 0; i < str.length; i++) {
      a[i] = str
        .charCodeAt(i)
        .toString(16)
        .replace(/^([\da-f])$/, '0$1')
    }

    return a.join('')
  }

  public Hex2Bin = (hex: string) => {
    let result = ''
    for (let i = 0; i < hex.length; i += 2) {
      result += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }

    return result
  }
}
