import React, {Component} from 'react';
import {Card, Button} from 'antd';
import ReactECharts from 'echarts-for-react';
export default class Bar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sales: [5, 20, 36, 345, 12, 20],
            inventorys: [15, 12, 32, 312, 123, 23] 
        }
        this.getOption = this.getOption.bind(this);
    }
        
    getOption(){
        const {sales, inventorys} = this.state 
        return {
            title: {
                text: 'Status'
            },
            tooltip: {}, 
            legend: {
                data:['Sales', 'inventry']
            },
            xAxis: {
                data: ["T-shirt","sweater","Chiffon shirt","Pants","heel","socks"]
            },
            yAxis: {}, 
            series: [{
                name: 'Sales', type: 'bar', data:sales}, {
                name: 'inventry', type: 'bar', data: inventorys
            }]}
            }
        
    update = () => {
                const sales = this.state.sales.map(sale => sale + 1)
                const inventorys = this.state.inventorys.map(inventory => inventory -1) 
                this.setState({
                sales,
                inventorys
                }) }

    render() { 
        return (
                <div> <Card>
                <Button type='primary' onClick={this.update}>Update</Button> </Card>
                <Card title='Bar one'>
                <ReactECharts option={this.getOption()} style={{height: 300}}/>
                </Card> </div>
                ) }
}