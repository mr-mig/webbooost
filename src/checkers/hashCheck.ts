import { ParsedURL, ResourceMap, RequestCheckFunction } from '../utils/domain.js'
import { ALLOW_REQUEST_TOKEN } from "../utils/requestInterceptor.js"
import { redirect } from '../utils/requestInterceptor.js'

// todo generate proper filter
const resourceMap: ResourceMap = {
  "ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js":"jquery/1.11.0/jquery.min.js"
}

const hasMappedResource = (uri: string) =>
  resourceMap[uri] !== undefined

export const check: RequestCheckFunction = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return ALLOW_REQUEST_TOKEN

  // url totally match the library + version + cdn address
  if (hasMappedResource(parsedURL.uri)){
    parsedURL.boostedBy = 'hash'

    return redirect(
      resourceMap[parsedURL.uri] as string,
      tabId,
      parsedURL
    )

  } else {
    return ALLOW_REQUEST_TOKEN
  }
}
