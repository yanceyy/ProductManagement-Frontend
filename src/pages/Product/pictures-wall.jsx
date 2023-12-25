import {BASEURL, IMAGE_UPLOAD, IMAGE_UPLOAD_URL} from '../../utils/constants';
import {Modal, Upload, message} from 'antd';

import {PlusOutlined} from '@ant-design/icons';
import {reDeletePicture} from '../../api/action';
import {useState} from 'react';
import memoryUtils from "../../utils/memoryUtils";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export default function PicturesWall({imgs, bindPictures}) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState(() => {
        let fileList = [];

        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => {
                return {
                    uid: (-index).toString(),
                    name: img,
                    status: 'done',
                    url: IMAGE_UPLOAD_URL + img,
                };
            });
        }
        return fileList;
    });

    // close preview window
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        );
    };

    const handleChange = async ({file, fileList}) => {
        if (file.status === 'done') {
            const result = file.response;
            message.success('upload successfully');
            const {filename} = result;

            file = fileList[fileList.length - 1];
            file.name = filename;
            file.url = BASEURL + '/files/' + filename;
        } else if (file.status === 'removed') {
            const result = await reDeletePicture(file.name);
            if (result.deletedCount !== 0) {
                message.success('delete successfully');
            } else {
                message.error('delete failed');
            }
        }
        setFileList(fileList);
        bindPictures(fileList.map((item) => item.name));
    };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const bearerToken = memoryUtils?.user?.token

    const headers = {
        Authorization: `Bearer ${bearerToken}`
    };

    return (
        <>
            <Upload
                action={IMAGE_UPLOAD}
                listType="picture-card"
                fileList={fileList}
                accept="image/*"
                name="file"
                //parameter name in require header
                onPreview={handlePreview}
                onChange={handleChange}
                headers={headers}
            >
                {fileList.length >= 8 ? null : uploadButton}{' '}
            </Upload>
            <Modal
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
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
