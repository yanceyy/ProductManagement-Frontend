import {
    AppstoreOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    BarsOutlined,
    HomeOutlined,
    LineChartOutlined,
    PieChartOutlined,
    SafetyCertificateOutlined,
    ToolOutlined,
    UserOutlined,
} from '@ant-design/icons';

const menuList = [
    {
        title: 'Home', // menu title
        key: '/home', // path
        icon: <HomeOutlined />, // icon name
        isPublic: true, // public
    },
    {
        title: 'Produces',
        key: '/products',
        icon: <AppstoreOutlined />,
        children: [
            {
                // children menu
                title: 'Manage category',
                key: '/category',
                icon: <BarsOutlined />,
            },
            {
                title: 'Manage products',
                key: '/product',
                icon: <ToolOutlined />,
            },
        ],
    },

    {
        title: 'Manage users',
        key: '/user',
        icon: <UserOutlined />,
    },
    {
        title: 'Manage roles',
        key: '/role',
        icon: <SafetyCertificateOutlined />,
    },
    {
        title: 'Charts',
        key: '/chart',
        icon: <AreaChartOutlined />,
        children: [
            {
                title: 'Bar',
                key: '/chart/bar',
                icon: <BarChartOutlined />,
            },
            {
                title: 'Line',
                key: '/chart/line',
                icon: <LineChartOutlined />,
            },
            {
                title: 'Pie',
                key: '/chart/pie',
                icon: <PieChartOutlined />,
            },
        ],
    },
];

export default menuList;
