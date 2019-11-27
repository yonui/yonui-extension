import React from 'react'
import { Wrapper, WrapperChild, WrapperResult } from '../types/wrapper'

const wrapper: Wrapper = (orig: WrapperChild): WrapperResult => {
  return (props: any, engine?: any) => {
    const { nid, uitype } = props || {}
    const divProps = { nid, uitype }
    return <div {...divProps}>
      {orig(props, engine)}
    </div>
  }
}

export default wrapper
