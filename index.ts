import { ReactNode } from 'react'

export interface ComponentManifest { // 单个组件类型定义
  label: string
}

export interface Manifest { // 组件包类型定义
  components: ComponentManifest[]
}

export interface Component<P = any> {
  manifest: ComponentManifest,
  render: (props: P) => ReactNode
}
