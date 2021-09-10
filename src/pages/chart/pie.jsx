import React, {Component} from 'react';
import {Card} from 'antd';
import ReactECharts from 'echarts-for-react';

export default class Pie extends Component {
  getOption = () => { 
    return {
      title : {
      text: 'The source of redirects', 
      subtext: 'emulate data', 
      x:'center'
    },
    tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)" },
    legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct','Mail Advertisement','Google Advertisement','Youtube Advertisement','Search engine']
    },
    series : [
    {
    name: 'The source of redirects',
    type: 'pie',
    radius : '55%',
    center: ['50%', '60%'], data:[
    {value:335, name:'Direct'}, 
    {value:310, name:'Mail Advertisement'}, 
    {value:234, name:'Google Advertisement'}, 
    {value:135, name:'Youtube Advertisement'}, 
    {value:1548, name:'Search engine'}
    ], itemStyle: {emphasis: {
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
    } }
    } ]
    }; }

    getOption2 = () => {
      return {
    backgroundColor: '#2c343c',
    title: {
    text: 'Customized Pie', left: 'center',
    top: 20,
    textStyle: {
    color: '#ccc' }
    },
    tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    visualMap: { show: false, min: 80, max: 600, inRange: {
    colorLightness: [0, 1] }
    },
    series : [
    { name:'The source of redirects', 
    type:'pie',
    radius : '55%',
    center: ['50%', '50%'], 
    data:[{value:335, name:'Direct'}, {value:310, name:'Mail Advertisement'}, 
    {value:274, name:'Google Advertisement'}, {value:235, name:'Youtube Advertisement'},
    {value:400, name:'Search engine'}].sort(function (a, b) { return a.value - b.value; }), roseType: 'radius',
    label: {
    normal: { textStyle: {
    color: 'rgba(255, 255, 255, 0.3)' }
    } },
    labelLine: { normal: {
    lineStyle: {
    color: 'rgba(255, 255, 255, 0.3)'
    },
    smooth: 0.2, length: 10, length2: 20
    } },
    itemStyle: { 
      normal: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      } },
    animationType: 'scale', 
    animationEasing: 'elasticOut', 
    animationDelay: function () {
      return Math.random() * 200; }
      } ]}; 
    }

    render(){ return (
          <div>
          <Card title='Pie chart one'>
          <ReactECharts option={this.getOption()} style={{height: 300}}/> </Card>
          <Card title='Pie chart two'>
          <ReactECharts option={this.getOption2()} style={{height: 300}}/>
          </Card> </div>
      ) }
    }