export interface DataEnvelope<T> {
  data: T
  error?: string
}

export interface DataListEnvelope<T> extends DataEnvelope<T[]> {
  data: T[]
  error?: string
}
