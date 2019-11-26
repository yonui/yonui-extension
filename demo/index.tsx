// demo
import { Component } from '../index'
import { MetaTypes } from '../types/MetaTypes';
import './index.css'
import './test.less'

export class ButtonComponent implements Component {
  manifest = {
    name: 'button',//自定义组件名称
    label: '按钮',//自定义组件文本
    description: '',//描述
    props: [//adapter适配层数据
      {
        name: 'code', //字段名称
        type: String, //字段类型
        defaultValue: '', //字段默认值
        showDesign: true, //是否展示在适配层
        designConfig: { //当时showDesign值为true需要此字段
          type: MetaTypes.Text,// 适配层的可选视图类型(枚举项)
          isRequired: true,//是否时必填项
          props: {},//和type相关联,当type是MetaTypes的select,refer,IframeModal等需要添加props
          label: '编码',//在适配层页面显示的文本
          labelStyle: JSON.stringify({color: 'red'}),//在适配层页面显示的样式
          help: '这是编码字段'//提示信息
        },
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
        },
        onChange: function () {//字段联动方法
          return {}
        }
      }
    ],
    children: [],//可放置哪些子组件,以是数组,也可以是方法
    parent: function (parentNode:object) {//可放置哪些子组件,以是数组,也可以是方法
      return true
    }
  }
  render = () => ''
}
