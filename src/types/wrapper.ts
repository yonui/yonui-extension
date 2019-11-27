import { ReactNode } from 'react'
export type WrappedNode = any;
export type WrapperChild<P = any> = (props?: P, engine?: (props: any) => ReactNode) => ReactNode
export type WrapperResult<P = any> = (props?: P, engine?: (props: any) => WrappedNode) => WrappedNode
export type Wrapper<P = any> = (orig: WrapperChild) => WrapperResult
