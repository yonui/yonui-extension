import { ReactNode } from 'react'
import { checkPropTypes, node } from 'prop-types'
import { FiledTypes , MetaTypes, ComponentTypes} from './index-types';
/**
 * 设计器适配层(Adapter)props描述
 * name 名称 适配层需要的字段(枚举项)  必填
 * type  数据类型  适配层的可选视图类型(枚举项) 必填
 * label 文本 在适配层页面显示的文本 必填
 * defaultValue 默认值--可以是数据,也可以是方法 非必填
 * showDesign 是否展示在适配层 非必填 无此属性,适配层默认展示
 * change 当值改变时,是否会触发其它字段联动,值为
 */
interface Props {
  name: FiledTypes
  type: MetaTypes
  label: string
  defaultValue?: string
  showDesign?: boolean
  changeFileds?: Array<FiledTypes>
  onChange?: (value: string) => void;
}
/**
 * 自定义组件描述
 * name 组件名称,必填
 * label 组件文本,必填
 * type 组件类型 [control,container]---是否需要此项，必填
 * description 组件的相关描述，非必填
 * props 设计器适配层(Adapter)需要的一些关键信息,非必填,如果不指定props，则使用默认配置，默认配置可随 type 变化
 * children 当前组件可放置哪些子组件,非必填
 * parent 当前组件可以放置哪些父组件，非必填
 */
export interface ComponentManifest { // 单个组件类型定义
  name: string
  label: string
  type: 'control'|'container'
  description?: string
  props?: Props[]
  children?: (treeNode: object, currentNode: object) => void;
  parent?: (treeNode: object, parentNode: object) => void;
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
    type: ComponentTypes.control,
    description: '',
    props: [{
      name: FiledTypes.bHidden,
      type: MetaTypes.Select,
      label: '',
      defaultValue: '',
      showDesign: true,
      changeFileds: [FiledTypes.bHidden]
    }],
    children:function () {
      
    },
    parent:function () {
      
    }
  }
}
