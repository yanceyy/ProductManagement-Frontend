import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {redeletePicture} from '../../api/action';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

class PicturesWall extends Component {
    constructor(props) {
        super(props);
        let fileList = [];
        const {imgs} = this.props;
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => {
                return {
                    uid: (-index).toString(),
                    name: img,
                    status: 'done',
                    url: 'http://localhost:5000/upload/' + img,
                };
            });
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: fileList,
            // {
            //     uid: '-1', // unique id for each file
            //     name: 'image.png', // picture name
            //     status: 'done',  // the satus:{uploading error removed}
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' // the url of picture
            // },
        };
    }

    // close preview window
    handleCancel = () => this.setState({previewVisible: false});
    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = async ({file, fileList}) => {
        console.log(fileList);
        if (file.status === 'done') {
            const result = file.response;
            if (result.status === 0) {
                message.success('upload successfully');
                const {name, url} = result.data;
                console.log(result.data);
                const file = fileList[fileList.length - 1]; // can use negative index like Python
                file.name = name;
                file.url = url;
            } else {
                message.error('upload failed');
            }
        } else if (file.status === 'removed') {
            const result = await redeletePicture(file.name);
            if (result.status === 0) {
                message.success('delete successfully');
            } else {
                message.error('delete failed');
            }
        }
        this.setState({fileList});
    };

    // transfor picture names to parent companent
    getImgs = () => {
        return this.state.fileList.map((file) => file.name);
    };

    componentDidMount = () => {
        this.props.bindPictures(this.getImgs);
    };

    render() {
        const {previewVisible, previewImage, fileList, previewTitle} =
            this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="http://localhost:3000/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    accept="image/*"
                    name="image"
                    //parameter name in require header
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}{' '}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="example"
                        style={{width: '100%'}}
                        src={previewImage}
                    />
                </Modal>
            </>
        );
    }
}

export default PicturesWall;
