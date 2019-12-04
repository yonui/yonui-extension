import { ReactNode } from 'react'
import { EditTypes } from './meta'

export type WrappedNode = any;
export type WrapperChild<P = any> = (props?: P, engine?: (props: any) => ReactNode) => ReactNode
export type WrapperResult<P = any> = (props?: P, engine?: (props: any) => WrappedNode) => WrappedNode
export interface WrapOptions {
  excludeNidAndUiType?: boolean
  manifest?: ComponentManifest
}

export type Wrapper<P = any> = (orig: WrapperChild, options?: WrapOptions) => WrapperResult

/**
 * designConfig props的描述 designConfigProps
 * type  适配层的可选视图类型(枚举项)
 * label 文本 在适配层页面显示的文本
 * labelStyle  在适配层页面显示的文本的样式文件
 * isRequired 是否必填
 * props 根据适配器中MetaTypes配置不同的props
 * help 提示信息
 */
interface designConfigProps {
  type: EditTypes
  label: string
  labelStyle?: string
  isRequired?: boolean
  help?: string
  props: object
}

export enum FieldTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  object = 'object',
  date = 'date',
  action = 'action',
  child = 'child',
  array = 'array'
}

/**
 * 设计器适配层(Adapter)Props描述 Props
 * name 名称
 * type 数据类型
 * defaultValue 默认值--可以是数据,也可以是方法
 * value 值
 * showDesign 是否展示在适配层 当showDesign为false,需要配置designConfig字段
 * designConfig 适配层相关配置属性对象
 * onChange 当值改变时,触发事件联动的方法,可改变其它配置字段的值
 * onChange方法参数详解
 * @param props 当前组件所有的props
 * @param propsName 当前组件当前字段的propsName
 * @param value 当前组件当前字段的值
 */

export interface Props {
  name: string
  type: FieldTypes
  defaultValue?: any
  value?: string
  showDesign?: boolean
  designConfig?: designConfigProps
  onChange?: (props: Props[], propsName: string, value: string) => Props[]
}

/**
 * 自定义组件描述 ComponentManifest
 * name 组件名称
 * label 组件文本
 * type 类型
 * description 组件的相关描述
 * props 设计器适配层(Adapter)需要的一些关键信息
 * children 当前组件可放置哪些子组件,类型可以是数组,也可以是方法
 * parent 当前组件可以放置哪些父组件,当前组件可放置哪些子组件,类型可以是数组,也可以是方法
 */
export interface ComponentManifest { // 单个组件类型定义
  name: string
  label: string
  description?: string
  type?: string
  props?: Props[]
  children?: string[] | ((childNode: ComponentManifest) => boolean)
  parent?: string[] | ((parentNode: ComponentManifest) => boolean)
}

export interface Manifest { // 组件包类型定义
  id: string
  version: string
  name: string
  description?: string
  dependencies?: {
    [dep: string]: string // name: version
  }
  components: ComponentManifest[]
}

export interface Component<P = any> {
  manifest: ComponentManifest
  render: (props?: P, engine?: (props: any) => WrappedNode) => WrappedNode
}

export { EditTypes }
