import { ReactNode } from 'react'
import {  MetaTypes } from './types/MetaTypes';
/**
 * designConfig props的描述
 * type  数据类型  适配层的可选视图类型(枚举项)
 * label 文本 string类型 在适配层页面显示的文本
 * labelStyle  在适配层页面显示的文本的样式文件
 * isRequired 是否必填
 * props 根据适配器中MetaTypes配置不同的props
 * help 提示信息
 */
interface designConfigProps {
  type: MetaTypes
  label: string
  labelStyle?: string
  isRequired: boolean
  help?: string
  props: object
}

/**
 * 设计器适配层(Adapter)props描述
 * name 名称 string类型  必填
 * defaultValue 默认值--可以是数据,也可以是方法 非必填
 * showDesign 是否展示在适配层 当showDesign为false,需要配置designConfig字段
 * designConfig 适配层相关配置属性对象
 * change 当值改变时,是否会触发其它字段联动,值为
 */
interface Props {
  name: string
  defaultValue?: string
  showDesign: boolean
  designConfig?: designConfigProps
  onChange?: (propsName: string, value: string) => object
}

/**
 * 自定义组件描述
 * name 组件名称,必填
 * label 组件文本,必填
 * description 组件的相关描述，非必填
 * props 设计器适配层(Adapter)需要的一些关键信息,非必填,如果不指定props，则使用默认配置，默认配置可随 type 变化
 * children 当前组件可放置哪些子组件,非必填
 * parent 当前组件可以放置哪些父组件，非必填
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

// demo
export class CustomComponent implements Component {
  render = () => ''
  manifest = {
    name: 'cusom',
    label: '自定义',
    description: '',
    props: [{
      name: 'bHidden',
      type: 'string',
      defaultValue: '',
      showDesign: true,
      designConfig: {
        type: MetaTypes.Select,
        isRequired: true,
        props:{
          options:
          [
            {value: "top", text: '头部'},
            {value: "batch", text: '批量'},
            {value: "inrow", text: '在行中'}
          ]
        },
        label: '',
        labelStyle: JSON.stringify({color:'red'}),
        help:''
      }
    }],
    children:function (childNode:object) {
      return true;
    },
    parent:function (parentNode:object) {
      return true
    }
  }
}
