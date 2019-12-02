import React from 'react'
import { Wrapper, WrapperChild, WrapperResult } from '../types/wrapper'

const renderChildren = (engine: any, children: any): any => {
  if (Array.isArray(children)) {
    return children.map(engine)
  }
  return engine(children)
}

const wrapper: Wrapper = (orig: WrapperChild): WrapperResult => {
  return (props: any, engine?: any) => {
    const { nid, uitype, children } = props || {}
    const divProps = { nid, uitype }
    return <div {...divProps}>
      {orig({ ...props, children: children ? renderChildren(engine, children) : undefined }, engine)}
    </div>
  }
}

export default wrapper
