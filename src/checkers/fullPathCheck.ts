import { ParsedURL, ResourceMap, RequestCheckFunction } from '../utils/domain.js'
import { ALLOW_REQUEST_TOKEN } from "../utils/requestInterceptor.js"
import { redirect } from '../utils/requestInterceptor.js'
import fullCheckConfig from '../configs/fullpath-gen.js'

const resourceMap = fullCheckConfig as ResourceMap

const hasMappedResource = (uri: string) =>
  resourceMap[uri] !== undefined

export const check: RequestCheckFunction = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return ALLOW_REQUEST_TOKEN

  // url totally match the library + version + cdn address
  if (hasMappedResource(parsedURL.uri)){
    parsedURL.boostedBy = 'full'

    return redirect(
      resourceMap[parsedURL.uri] as string,
      tabId,
      parsedURL
    )

  } else {
    return ALLOW_REQUEST_TOKEN
  }
}
