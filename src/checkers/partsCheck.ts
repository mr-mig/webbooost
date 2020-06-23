import { ParsedURL, ResourceMap } from '../utils/domain.js'
import { redirect, ALLOW_REQUEST_TOKEN } from '../utils/requestInterceptor.js'
import partsConfig from '../configs/parts-gen.js'

const resourceMap = partsConfig as ResourceMap
const keys = Object.keys(resourceMap)

function hasPart(path: string) {
  let result = null
  for (var k of keys) {
    if (path.indexOf(k) > -1) {
      result = k
      break;
    }
  }
  return result
}

export const check = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return ALLOW_REQUEST_TOKEN

  // path partially match the library + version
  const match = hasPart(parsedURL.path)
  if (match){
    parsedURL.boostedBy = 'parts'

    return redirect(
      resourceMap[match] as string,
      tabId,
      parsedURL
    )

  } else {
    return ALLOW_REQUEST_TOKEN
  }
}
