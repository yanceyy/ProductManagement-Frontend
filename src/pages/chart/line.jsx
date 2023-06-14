import { useState } from 'react';
import { Card, Button } from 'antd';
import ReactECharts from 'echarts-for-react';

const Line = () => {
    const [sales, setSales] = useState([25, 20, 12, 35, 5, 15]);
    const [inventorys, setInventorys] = useState([2, 56, 21, 32, 44, 12]);

    const getOption = () => {
        return {
            title: {
                text: 'Status',
            },
            tooltip: {},
            legend: {
                data: ['Sales', 'inventry'],
            },
            xAxis: {
                data: [
                    'T-shirt',
                    'sweater',
                    'Chiffon shirt',
                    'Pants',
                    'heel',
                    'socks',
                ],
            },
            yAxis: {},
            series: [
                {
                    name: 'Sales',
                    type: 'line',
                    data: sales,
                },
                {
                    name: 'inventry',
                    type: 'line',
                    data: inventorys,
                },
            ],
        };
    };

    const update = () => {
        setSales(sales.map((sale) => sale + 1));
        setInventorys(inventorys.map((inventory) => inventory - 1));
    };

    return (
        <div>
            <Card>
                <Button type="primary" onClick={update}>
                    Update
                </Button>
            </Card>
            <Card title="Bar one">
                <ReactECharts option={getOption()} style={{ height: 300 }} />
            </Card>
        </div>
    );
};

export default Line;
