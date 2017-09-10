import { URL } from './url'
export { URL, ParsedURL } from './url'
export type InjecteesFilepath = string

export type ResourceDescriptor = {
  versions?: string[],
  urls: URL[],
  file: string
}

export type ResourceMap = {
  [resourceCDNURI in URL]: InjecteesFilepath | boolean
}

type HashConfig = {
  [resourceName in string]: ResourceDescriptor
}
