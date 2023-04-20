import { useState } from 'react';
// import imageTiny from '@mxsir/image-tiny';
import {
  InboxOutlined,
  DownloadOutlined,
  FileZipOutlined
} from '@ant-design/icons';
import { Upload, Slider, Button, Input, Empty } from 'antd';
const { Dragger } = Upload;
import './index.css';

const qualityStep = {
  20: '20%',
  40: '40%',
  60: '60%',
  80: {
    style: { color: '#f50' },
    label: <strong>80%(推荐)</strong>
  },
  100: '100%'
};
const Home = () => {
  const [quality, setQuality] = useState(80);
  const [originFileList, setOriginFileList] = useState([]);
  // const chromeVersion = versions.chrome();
  // const nodeVersion = versions.node();
  // const electronVersion = versions.electron();
  const handleChange = (data) => {
    const { fileList } = data;
    if (!fileList.length) return;
    const _res = fileList.map((obj) => {
      const { originFileObj } = obj;
      return originFileObj;
    });
    setOriginFileList(_res);
  };
  const handleDrop = (e) => {
    console.log(e);
  };
  const onChangeQuality = (number) => {
    console.log(number);
    setQuality(number);
  };
  const onCompressImage = async () => {
    // imageTiny();
    // const res = await imageTiny(originFileList, quality);
    console.log(originFileList);
  };
  return (
    <div className="image-tiny-outer">
      {/* <h1>
        页面1 此应用版本为: chrome：{chromeVersion} Node: {nodeVersion}{' '}
        Electron: {electronVersion}
      </h1> */}
      <Dragger
        multiple={true}
        accept=".jpg, .jpeg, .png, .gif"
        className="antd-uploader-component"
        showUploadList={false}
        onChange={handleChange}
        onDrop={handleDrop}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p>点击或拖拽图片</p>
      </Dragger>
      <div className="quality-picker">
        <div className="label">压缩质量:</div>
        <div className="quality-form-outer">
          <Slider
            marks={qualityStep}
            step={20}
            value={quality}
            onChange={onChangeQuality}
          />
        </div>
      </div>
      <div className="action-bar">
        <Button
          type="primary"
          ghost
          icon={<DownloadOutlined />}
          style={{ marginRight: 5 }}
        >
          图片存储到...
        </Button>
        <Input readOnly />
        <Button
          type="primary"
          style={{ marginLeft: 15 }}
          icon={<FileZipOutlined />}
          onClick={onCompressImage}
        >
          开始压缩
        </Button>
      </div>
      <div className="img-list-empty">
        <Empty />
      </div>
    </div>
  );
};

export default Home;
