import React from 'react'
import { Wrapper, WrapperChild, WrapperResult } from '../types/wrapper'
import { ComponentManifest } from '../types'

const renderChildren = (engine: any, children: any): any => {
  if (Array.isArray(children)) {
    return children.map(engine)
  }
  return engine(children)
}

function parseProps (props: any, engine: any, manifest?: ComponentManifest): any {
  // 处理props，包括处理 children，以及将一些props做类型转换
  if (props.children) {
    props.children = renderChildren(engine, props.children)
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
