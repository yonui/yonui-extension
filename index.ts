import { ReactNode } from 'react'
import { MetaTypes } from './types/MetaTypes';
/**
 * designConfig props的描述
 * type  适配层的可选视图类型(枚举项)
 * label 文本 在适配层页面显示的文本
 * labelStyle  在适配层页面显示的文本的样式文件
 * isRequired 是否必填
 * props 根据适配器中MetaTypes配置不同的props
 * help 提示信息
 */
interface designConfigProps {
  type: MetaTypes
  label: string
  labelStyle?: string
  isRequired?: boolean
  help?: string
  props: object
}

/**
 * 设计器适配层(Adapter)props描述
 * name 名称  
 * type 数据类型
 * defaultValue 默认值--可以是数据,也可以是方法 
 * showDesign 是否展示在适配层 当showDesign为false,需要配置designConfig字段
 * designConfig 适配层相关配置属性对象
 * change 当值改变时,是否会触发其它字段联动,值为
 */
interface Props {
  name: string
  type: any,
  defaultValue?: string
  showDesign: boolean
  designConfig?: designConfigProps
  onChange?: (propsName: string, value: string) => object
}

/**
 * 自定义组件描述
 * name 组件名称
 * label 组件文本
 * description 组件的相关描述
 * props 设计器适配层(Adapter)需要的一些关键信息
 * children 当前组件可放置哪些子组件
 * parent 当前组件可以放置哪些父组件
 */
export interface ComponentManifest { // 单个组件类型定义
  name: string
  label: string
  description?: string
  props?: Props[]
  children?: string[] | ((childNode: ComponentManifest) => boolean)
  parent?: (parentNode: ComponentManifest) => boolean
}

export interface Manifest { // 组件包类型定义
  components: ComponentManifest[]
}

export interface Component<P = any> {
  manifest: ComponentManifest
  render: (props?: P, engine?: (props: any) => ReactNode) => ReactNode
}
