import { ParsedURL, RegExpMap } from '../utils/domain.js'
import { redirect, ALLOW_REQUEST_TOKEN } from '../utils/requestInterceptor.js'

// todo import real filters
const regexpMap = {
  'jquery.js\\?ver=.*$': 'jquery/1.11.0/jquery.min.js'
} as RegExpMap

let regexps: RegExp[] = []
let substitutions: string[] = []

// prebuild regexps
Object.keys(regexpMap).forEach( key => {
  regexps.push(new RegExp(key))
  substitutions.push(regexpMap[key])
})

export const check = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return ALLOW_REQUEST_TOKEN

  const path = parsedURL.path
  let substitution

  for (let i = 0; i < regexps.length; i++){
    console.log(regexps[i], path, regexps[i].test(path))
    if (regexps[i].test(path)){
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
