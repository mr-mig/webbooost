import { ParsedURL, RegExpMap } from '../domain'
import { redirect, ALLOW_REQUEST_TOKEN } from '../requestInterceptor'

// todo import real filters
const regexpMap = {
  'pattern$': 'filepath'
} as RegExpMap

let regexps: RegExp[] = []
let substitutions: string[] = []

// prebuild regexps
Object.keys(regexpMap).forEach( key => {
  regexps.push(new RegExp(key))
  substitutions.push(regexpMap[key])
})

export const check = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return

  const uri = parsedURL.uri
  let substitution

  for (let i = 0; i < regexps.length; i++){
    if (regexps[i].test(uri)){
      substitution = substitutions[i]
      break
    }
  }

  if (substitution){
    parsedURL.boostedBy = 'reg'
    redirect(substitution, tabId, parsedURL)
  } else {
    return ALLOW_REQUEST_TOKEN
  }
}
