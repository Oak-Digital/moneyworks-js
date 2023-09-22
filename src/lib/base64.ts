import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

export function base64Encode(str: string) {
  const words = Utf8.parse(str)
  return Base64.stringify(words)
}
