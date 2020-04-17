import * as React from 'react'
// import { WrapperChild, WrapperResult, ComponentManifest, FieldTypes } from '../types'
import { ComponentManifest, Props, FieldTypes, EditTypes, UITable, ExtensionProps } from '../types'

const bIsNullProps: Props = {
  name: 'bIsNull',
  type: FieldTypes.boolean,
  defaultValue: false,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '允许为空'
  }
}
const bMustSelectProps: Props = {
  name: 'bMustSelect',
  type: FieldTypes.boolean,
  defaultValue: false,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '是否必传'
  }
}
const isExportProps: Props = {
  name: 'isExport',
  type: FieldTypes.boolean,
  defaultValue: true,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '允许导出'
  }
}
const bVmExcludeProps: Props = {
  name: 'bVmExclude',
  type: FieldTypes.number,
  defaultValue: 0,
  showDesign: true,
  designConfig: {
    type: EditTypes.Select,
    isRequired: true,
    props: {
      options: [
        { text: '默认', value: 0 },
        { text: '只存储不显示', value: 1 },
        { text: '只显示不存储', value: 2 }
      ]
    },
    label: '数据形态'
  }
}
const disabledProps: Props = {
  name: 'disabled',
  type: FieldTypes.boolean,
  defaultValue: false,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '禁用'
  }
}
const singleLineProps: Props = {
  name: 'singleLine',
  type: FieldTypes.boolean,
  defaultValue: false,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '单行展示'
  }
}
const splitLineProps: Props = {
  name: 'splitLine',
  type: FieldTypes.boolean,
  defaultValue: true,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '分割线'
  }
}

const requiredProps: Props = {
  name: 'required',
  type: FieldTypes.boolean,
  defaultValue: false,
  showDesign: true,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: true,
    props: {},
    label: '必填'
  }
}

const bCheckProps: Props = {
  name: 'bCheck',
  type: FieldTypes.boolean,
  defaultValue: false,
  showDesign: false,
  designConfig: {
    type: EditTypes.Bool,
    isRequired: false,
    props: {},
    label: '是否校验'
  }
}
const cStyleProps: Props = {
  name: 'cStyle',
  type: FieldTypes.object,
  showDesign: false,
  designConfig: {
    type: EditTypes.Json,
    isRequired: false,
    props: {},
    label: '拓展配置'
  }
}
const formulaProps: Props = {
  name: 'formula',
  type: FieldTypes.string,
  showDesign: false,
  designConfig: {
    type: EditTypes.Text,
    isRequired: false,
    props: {},
    label: '计算公式'
  }
}
const ExtensionPropsMap = {
  [ExtensionProps.bIsNull]: bIsNullProps,
  [ExtensionProps.bMustSelect]: bMustSelectProps,
  [ExtensionProps.bVmExclude]: bVmExcludeProps,
  [ExtensionProps.disabled]: disabledProps,
  [ExtensionProps.isExport]: isExportProps,
  [ExtensionProps.singleLine]: singleLineProps,
  [ExtensionProps.splitLine]: splitLineProps,
  [ExtensionProps.required]: requiredProps,
  [ExtensionProps.bCheck]: bCheckProps,
  [ExtensionProps.formula]: formulaProps,
  [ExtensionProps.cStyle]: cStyleProps
}
// const renderChildren = (engine: any, children: any): any => {
//   // TODO: 可能会有xss攻击风险，但是暂时先不处理
//   if (Array.isArray(children)) {
//     return children.map(item => renderChildren(engine, item))
//   }

//   if (typeof children === 'object') {
//     if (typeof children.$$typeof === 'symbol') {
//       // react组件，直接返回
//       return children
//     } else if (children.type) {
//     // 有type说明是ui meta，走engine渲染
//       if (!engine) {
//         console.warn('Cannot parse ui meta because no engine provides!')
//         return null
//       }
//       return engine(children)
//     }
//   } else if (typeof children === 'string') {
//     // 如果是字符串，需要根据情况做不同的处理
//     try {
//       // 如果可以被 JSON.parse 解析，则以object方式继续渲染
//       return renderChildren(engine, JSON.parse(children))
//     } catch (error) {
//       // 如果JSON.parse失败，则有可能是 html 或者 普通文本，两种方式都可以留到后面用dangerouslySetInnerHTML处理
//     }
//   }

//   return <div dangerouslySetInnerHTML={{ __html: `${children}` }}/>
// }

// function parseProps (origProps: any, engine: any, manifest?: ComponentManifest): any {
//   const props = { ...origProps }
//   // 处理props，包括处理 children，以及将一些props做类型转换
//   if (props.children) {
//     props.children = renderChildren(engine, props.children)
//   }

//   // 根据manifest处理其它字段转换
//   if (manifest) {
//     const propsKeySet = new Set(Object.keys(props))
//     for (const propsItem of manifest.props || []) {
//       const { name, type } = propsItem
//       if (!propsKeySet.has(propsItem.name)) {
//         continue
//       }
//       if (type === FieldTypes.action) {
//         // Action(实际是String) => 函数
//         const actionName = `${props[name]}`
//         props[name] = (...args: any[]) => {
//           return props.__dispatch__
//             ? props.__dispatch__(props[name], ...args)
//             : console.log(`Action: ${actionName}`)
//         }
//       } else if (type === FieldTypes.date) {
//         // String => Date
//         props[name] = new Date(props[name])
//       } else if (type === FieldTypes.array || type === FieldTypes.object) {
//         // String => JSON.parse 处理后的object
//         try {
//           if (props[name]) {
//             props[name] = JSON.parse(props[name])
//           }
//         } catch (error) {
//           console.warn(error)
//           props[name] = null
//         }
//       } else if (type === FieldTypes.child) {
//         props[name] = renderChildren(engine, props[name])
//       }
//     }
//   }
//   return props
// }

export interface WrapOptions {
  excludeNidAndUiType?: boolean
  errorBoundary?: boolean
}

// function wrapper (orig: WrapperChild, options: WrapOptions = {}): WrapperResult {
//   return (props: any, engine?: any) => {
//     const { nid, uitype } = props || {}
//     const divProps = { nid, uitype }
//     const { excludeNidAndUiType, manifest } = options

//     const renderEngine = engine && engine.render ? engine.render : engine
//     const newProps = parseProps(props, renderEngine, manifest)
//     const innerComp = orig(newProps, renderEngine)
//     if (excludeNidAndUiType) {
//       return innerComp
//     }
//     return <div {...divProps}>{innerComp}</div>
//   }
// }

const wrapManifest = (manifest: ComponentManifest, options: WrapOptions = {}): ComponentManifest => {
  if (!manifest) {
    return manifest
  }
  const styleProp: Props = {
    name: 'style',
    type: FieldTypes.action,
    showDesign: true,
    designConfig: {
      label: '公共样式',
      type: EditTypes.IframeModal,
      help: '',
      props: {
        caption: '公共样式',
        iframeUrl: '/CssSelect',
        iframeId: 'mobileCssIframeModal',
        iframeContext: 'mobileCssIframeModal',
        addText: '新增样式',
        editText: '修改样式',
        message: true,
        isRequired: false,
        footer: true
      }
    }
  }

  const classNameProp: Props = {
    name: 'className',
    type: FieldTypes.string,
    defaultValue: '',
    showDesign: true,
    designConfig: {
      type: EditTypes.Text,
      label: 'className',
      isRequired: false,
      help: '自定义类名',
      props: {}
    }
  }
  // add default props in manifest
  manifest.props = manifest.props || []
  const props = manifest.props
  const propsNameSet = new Set(props.map(item => item.name))

  const extension = manifest.extension
  if (extension) {
    extension.forEach(item => {
      props.push(ExtensionPropsMap[item])
    })
    delete manifest.extension
  }

  // style
  if (!propsNameSet.has('style')) {
    props.push(styleProp)
  }

  // className
  if (!propsNameSet.has('className')) {
    props.push(classNameProp)
  }

  // 填充默认的 uiTable
  if (!manifest.uiTable) {
    manifest.uiTable = UITable.BillItemBase
  }

  return manifest
}

interface ErrorBoundaryState {
  hasError: boolean
}
class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor (props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static getDerivedStateFromError = () => {
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  componentDidCatch = (error: any, errorInfo: any) => {
    // 你同样可以将错误日志上报给服务器
    console.error(error, errorInfo)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render () {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <div>Something went wrong.</div>
    }
    return this.props.children
  }
}

/**
 *
 * @param Comp 要封装的组件
 * @param manifest 组件描述
 * @param options 选项
 */
const wrapper = (Comp: any, manifest: ComponentManifest, options: WrapOptions = {}): any =>
  class Wrapped extends React.Component<any> {
    static manifest = wrapManifest(manifest, options)

    renderWithoutWrapper = (): React.ReactNode => {
      return options.errorBoundary ? <ErrorBoundary>
        <Comp
          {...this.props}
        />
      </ErrorBoundary> : <Comp
        {...this.props}
      />
    }

    render = (): React.ReactNode => {
      const { nid, uitype } = this.props || {}
      const divProps = { nid, uitype }
      return options.excludeNidAndUiType
        ? this.renderWithoutWrapper()
        : <div {...divProps}>
          {this.renderWithoutWrapper()}
        </div>
    }
  }

export default wrapper
