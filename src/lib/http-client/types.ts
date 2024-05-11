export type HeaderValue = string | string[] | number | boolean | null

export interface RawHeaders {
  [key: string]: HeaderValue
}

export type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization'
export type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream'
  | string

export type RawRequestHeader = Partial<
  RawHeaders & {
    [Key in CommonRequestHeadersList]: HeaderValue
  } & {
    'Content-Type': ContentType
  }
>

export type RequestHeaders = RawRequestHeader

export type CommonResponseHeadersList =
  | 'Server'
  | 'Content-Type'
  | 'Content-Length'
  | 'Cache-Control'
  | 'Content-Encoding'

export type RawCommonResponseHeaders = {
  [Key in CommonResponseHeadersList]: HeaderValue
} & {
  'set-cookie': string[]
}

export type ResponseHeaders = RawCommonResponseHeaders

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpClientRequestConfig {
  baseUrl?: string
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string
  /** A boolean to set request's keepalive. */
  keepalive?: boolean
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  mode?: RequestMode
  priority?: RequestPriority
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: RequestRedirect
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  referrer?: string
  /** A referrer policy to set request's referrerPolicy. */
  referrerPolicy?: ReferrerPolicy
  /** An AbortSignal to set request's signal. */
  signal?: AbortSignal | null
  /** A config for server only */
  next?: NextFetchRequestConfig | undefined
  headers?: RequestHeaders
}

export type GetClientRequestConfig = HttpClientRequestConfig & {
  params?: Record<string, string | number>
}

export type ClientRequestConfig<T extends object = any> = GetClientRequestConfig & {
  body?: T
}

export type RequestConfig<T extends object = any> = ClientRequestConfig<T> & {
  method: Method
}

export interface HttpClientResponse<T = unknown> {
  data?: T
  status: number
  statusText: string
  headers: Headers
}
