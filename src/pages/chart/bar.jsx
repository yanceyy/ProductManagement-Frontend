import React, {useState} from 'react';
import {Card, Button} from 'antd';
import ReactECharts from 'echarts-for-react';

const Bar = () => {
    const [sales, setSales] = useState([5, 20, 36, 345, 12, 20]);
    const [inventorys, setInventorys] = useState([15, 12, 32, 312, 123, 23]);

    const getOption = () => {
        return {
            title: {
                text: 'Status'
            },
            tooltip: {},
            legend: {
                data: ['Sales', 'inventry']
            },
            xAxis: {
                data: ["T-shirt", "sweater", "Chiffon shirt", "Pants", "heel", "socks"]
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: sales
            }, {
                name: 'inventry',
                type: 'bar',
                data: inventorys
            }]
        }
    }

    const update = () => {
        setSales(sales.map(sale => sale + 1));
        setInventorys(inventorys.map(inventory => inventory - 1));
    }

    return (
        <div>
            <Card>
                <Button type='primary' onClick={update}>Update</Button>
            </Card>
            <Card title='Bar one'>
                <ReactECharts option={getOption()} style={{height: 300}}/>
            </Card>
        </div>
    );
}

export default Bar;
