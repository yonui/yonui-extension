import { Component } from '../index'

export class CustomComponent implements Component {
  manifest = {
    name: 'custom',
    label: '自定义'
  }
  render = () => ''
}
