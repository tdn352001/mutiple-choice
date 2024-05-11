import { headers } from 'next/headers'
import _ from 'lodash'
import type {
  ClientRequestConfig,
  GetClientRequestConfig,
  HttpClientRequestConfig,
  HttpClientResponse,
  RequestConfig,
} from './types'
import isUrl from 'is-url'
import { API_URL } from '@/lib/constants/api'

export class HttpClient {
  public config: HttpClientRequestConfig

  constructor(defaultConfig?: HttpClientRequestConfig) {
    this.config = defaultConfig || {}
  }

  private mergeConfig(config?: RequestConfig) {
    return _.merge(this.config, config)
  }

  private resolveUrl(urlStr: string, config: GetClientRequestConfig) {
    if (isUrl(urlStr)) {
      return urlStr
    }

    try {
      const { baseUrl, params } = config
      let _baseUrl = baseUrl
      if (!baseUrl) {
        const isServer = typeof window === 'undefined'
        if (!isServer) {
          _baseUrl = window.location.origin
        }
      }
      const url = new URL(urlStr, _baseUrl)

      if (params) {
        const searchParams = new URLSearchParams()
        for (const key in params) {
          searchParams.append(key, params[key].toString())
        }
        url.search = searchParams.toString()
      }

      return url.toString()
    } catch (error: any) {
      console.log({ err: error.message })
      return urlStr
    }
  }

  private async request<TResponse = unknown>(
    url: string,
    config: RequestConfig
  ): Promise<HttpClientResponse<TResponse>> {
    const mergedConfig = this.mergeConfig(config)

    const resolvedUrl = this.resolveUrl(url, mergedConfig)

    const res = await fetch(resolvedUrl, mergedConfig as any)
    const headers = res.headers
    const status = res.status
    const statusText = res.statusText

    const data = (await res.json()) as TResponse

    const result = {
      data,
      status,
      statusText,
      headers,
    }

    if (res.ok) {
      return result
    }

    throw result
  }

  get<TResponse = unknown>(url: string, config: ClientRequestConfig = {}) {
    return this.request<TResponse>(url, {
      method: 'GET',
      ...config,
    })
  }

  // post<TResponse = unknown, TBody extends object = any>(url: string, body: TBody, config: ClientRequestConfig = {}) {
  //   return this.request<TResponse>(url, {
  //     method: 'POST',
  //     body,
  //     ...config,
  //   })
  // }
}

export const httpClient = new HttpClient({
  baseUrl: API_URL,
})
