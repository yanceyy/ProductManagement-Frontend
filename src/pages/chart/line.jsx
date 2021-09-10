import React, {Component} from 'react';
import {Card, Button} from 'antd';
import ReactECharts from 'echarts-for-react';

export default class Line extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sales: [25, 20, 12, 35, 5, 15],
            inventorys: [2, 56, 21, 32, 44, 12] 
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
                name: 'Sales', type: 'line', data:sales}, {
                name: 'inventry', type: 'line', data: inventorys
            }]}
            }
        
    update = () => {
                const sales = this.state.sales.map(sale => sale + 1)
                const inventorys = this.state.inventorys.map(inventory => inventory -1) 
                this.setState({
                sales,
                inventorys
                }) }

    render() { return (
                <div> <Card>
                <Button type='primary' onClick={this.update}>Update</Button> </Card>
                <Card title='Bar one'>
                <ReactECharts option={this.getOption()} style={{height: 300}}/>
                </Card> </div>
                ) }
}