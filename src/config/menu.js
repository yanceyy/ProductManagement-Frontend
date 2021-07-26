import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';


const menuList = [
    {
      title: 'Main', // menu title
      key: '/home', // path
      icon: <HomeOutlined />, // icon name
      isPublic: true, // public
    },
    {
      title: 'Produces',
      key: '/products',
      icon: <AppstoreOutlined />,
      children: [ // children menu
        {
          title: 'manage category',
          key: '/category',
          icon: <BarsOutlined />
        },
        {
          title: 'manage products',
          key: '/product',
          icon: <ToolOutlined />
        },
      ]
    },
  
    {
      title: 'manage users',
      key: '/user',
      icon: <UserOutlined />
    },
    {
      title: 'manage roles',
      key: '/role',
      icon: <SafetyCertificateOutlined />,
    },
  
    {
      title: 'Charts',
      key: '/charts',
      icon: <AreaChartOutlined />,
      children: [
        {
          title: 'Bar',
          key: '/chart/bar',
          icon: <BarChartOutlined />
        },
        {
          title: 'Line',
          key: '/chart/line',
          icon: <LineChartOutlined />
        },
        {
          title: 'Pie',
          key: '/chart/pie',
          icon: <PieChartOutlined />
        },
      ]
    },
  ]
  
  export default menuList