/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MOCK_VALUE: string
  readonly VITE_API_URL: string
  readonly VITE_APP_BUCKET_NAME: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}