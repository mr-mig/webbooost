export { URL, ParsedURL } from './url'
export type InjecteesFilepath = string

export type ResourceDescriptor = {
  versions?: string[],
  urls: URL[],
  file: string
}

type HashConfig = {
  [resourceName in string]: ResourceDescriptor
}
