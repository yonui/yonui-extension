import { Component } from '../index'
import { MetaTypes } from '../types/MetaTypes';
// demo
export class ButtonComponent implements Component {
  manifest = {
    name: 'button',
    label: '按钮',
    description: '',
    props: [
      {
        name: 'code',
        type: String,
        defaultValue: '',
        showDesign: true,
        designConfig: {
          type: MetaTypes.Text,
          isRequired: true,
          props: {},
          label: '编码',
          labelStyle: JSON.stringify({color: 'red'}),
          help: '这是编码字段'
        }
      },
      {
        name: 'type',
        type: String,
        defaultValue: '',
        showDesign: true,
        designConfig: {
          type: MetaTypes.Select,
          props:{
            options:
            [
              { value: "primary", text: '主按钮' },
              { value: "ghost", text: '透明' },
              { value: "warning", text: '警告红' }
            ]
          },
          label: '类型',
          help:''
        }
      }
    ],
    children: [],
    parent: function (parentNode:object) {
      return true
    }
  }
  render = () => ''
}
