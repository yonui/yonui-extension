import React from 'react'
import { Wrapper, WrapperChild, WrapperResult } from '../types/wrapper'
import { ComponentManifest, FieldTypes } from '../types'

const renderChildren = (engine: any, children: any): any => {
  if (Array.isArray(children)) {
    return children.map(engine)
  }
  return engine(children)
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
        props[name] = (...args: any[]) => props.__dispatch__ ? props.__dispatch__(props[name], ...args) : console.log(`Action: ${props[name]}`)
      } else if (type === FieldTypes.date) {
        // String => Date
        props[name] = new Date(props[name])
      } else if (type === FieldTypes.array || type === FieldTypes.object) {
        // String => JSON.parse 处理后的object
        try {
          props[name] = JSON.parse(props[name])
        } catch (error) {
          console.error(error)
          props[name] = null
        }
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
    const newProps = parseProps(props, engine, manifest)
    const innerComp = orig(newProps, engine)
    if (excludeNidAndUiType) {
      return innerComp
    }
    return <div {...divProps}>
      {innerComp}
    </div>
  }
}

export default wrapper
