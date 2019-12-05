import React from 'react'
import { Wrapper, WrapperChild, WrapperResult, ComponentManifest, FieldTypes } from '../types'

const renderChildren = (engine: any, children: any): any => {
  // TODO: 可能会有xss攻击风险，但是暂时先不处理
  if (Array.isArray(children)) {
    return children.map(item => renderChildren(engine, item))
  }

  if (typeof children === 'object') {
    if (typeof children.$$typeof === 'symbol') {
      // react组件，直接返回
      return children
    } else if (children.type) {
    // 有type说明是ui meta，走engine渲染
      if (!engine) {
        console.warn('Cannot parse ui meta because no engine provides!')
        return null
      }
      return engine(children)
    }
  } else if (typeof children === 'string') {
    // 如果是字符串，需要根据情况做不同的处理
    try {
      // 如果可以被 JSON.parse 解析，则以object方式继续渲染
      return renderChildren(engine, JSON.parse(children))
    } catch (error) {
      // 如果JSON.parse失败，则有可能是 html 或者 普通文本，两种方式都可以留到后面用dangerouslySetInnerHTML处理
    }
  }

  return <div dangerouslySetInnerHTML={{ __html: `${children}` }}/>
}

function parseProps (origProps: any, engine: any, manifest?: ComponentManifest): any {
  const props = { ...origProps }
  // 处理props，包括处理 children，以及将一些props做类型转换
  if (props.children) {
    props.children = renderChildren(engine, props.children)
  }

  // 根据manifest处理其它字段转换
  if (manifest) {
    const propsKeySet = new Set(Object.keys(props))
    for (const propsItem of manifest.props || []) {
      const { name, type } = propsItem
      if (!propsKeySet.has(propsItem.name)) {
        continue
      }
      if (type === FieldTypes.action) {
        // Action(实际是String) => 函数
        const actionName = `${props[name]}`
        props[name] = (...args: any[]) => {
          return props.__dispatch__
            ? props.__dispatch__(props[name], ...args)
            : console.log(`Action: ${actionName}`)
        }
      } else if (type === FieldTypes.date) {
        // String => Date
        props[name] = new Date(props[name])
      } else if (type === FieldTypes.array || type === FieldTypes.object) {
        // String => JSON.parse 处理后的object
        try {
          if (props[name]) {
            props[name] = JSON.parse(props[name])
          }
        } catch (error) {
          console.warn(error)
          props[name] = null
        }
      } else if (type === FieldTypes.child) {
        props[name] = renderChildren(engine, props[name])
      }
    }
  }
  return props
}

export interface WrapOptions {
  excludeNidAndUiType?: boolean
  manifest?: ComponentManifest
}

const wrapper: Wrapper = (orig: WrapperChild, options: WrapOptions = {}): WrapperResult => {
  return (props: any, engine?: any) => {
    const { nid, uitype } = props || {}
    const divProps = { nid, uitype }
    const { excludeNidAndUiType, manifest } = options

    const renderEngine = engine && engine.render ? engine.render : engine
    const newProps = parseProps(props, renderEngine, manifest)
    const innerComp = orig(newProps, renderEngine)
    if (excludeNidAndUiType) {
      return innerComp
    }
    return <div {...divProps}>{innerComp}</div>
  }
}

export default wrapper
