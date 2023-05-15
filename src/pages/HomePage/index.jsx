import { useState, useRef, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import JSZip from 'jszip';
import fs from 'fs';
import imageTiny from '@mxsir/image-tiny';
import {
  InboxOutlined,
  DownloadOutlined,
  FileZipOutlined
} from '@ant-design/icons';
import {
  Slider,
  Button,
  Input,
  Empty,
  Upload,
  Row,
  Col,
  notification
} from 'antd';
import { getSizeTrans } from '../../utils/fileSize';
import './index.css';

const { Dragger } = Upload;
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
let count = 0;
const Home = () => {
  const fileListRef = useRef([]);
  const [quality, setQuality] = useState(80);
  const [showPicList, setShowPicList] = useState([]);
  const [originFileList, setOriginFileList] = useState([]);
  const [savePath, setSavePath] = useState('');
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    getDefaultSavePath();
  }, []);
  // const chromeVersion = versions.chrome();
  // const nodeVersion = versions.node();
  // const electronVersion = versions.electron();
  // const handleChange = (data) => {
  //   const { fileList } = data;
  //   if (!fileList.length) return;
  //   const _res = fileList.map((obj) => {
  //     const { originFileObj } = obj;
  //     return originFileObj;
  //   });
  //   setOriginFileList(_res);
  // };

  const getDefaultSavePath = async () => {
    const path = await ipcRenderer.invoke('path:get-default-save-path');
    setSavePath(path);
  };
  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer?.files;
    console.log(files);
    const arr = [];
    for (const f of files) {
      console.log(f);
      arr.push(f);
    }
  };
  const onChangeQuality = (number) => {
    console.log(number);
    setQuality(number);
  };
  const onCompressImage = () => {
    originFileList.forEach((file) => {
      asyncCompressImage(file);
    });
  };
  const asyncCompressImage = async (file) => {
    const { uid } = file;
    try {
      console.log(file, quality);
      const tinyFile = await imageTiny(file, quality);
      count++;
      console.log('tinyFile', tinyFile);
      const rate =
        ((((file.size - tinyFile.size) * 100) / file.size) | 0) + '%';
      const imgInfo = {
        ...file,
        uid,
        name: file.name,
        beforeSize: getSizeTrans(file.size),
        data: tinyFile,
        compressStatusText: '已压缩',
        compressStatus: 'done',
        afterSize: getSizeTrans(tinyFile.size),
        rate,
        url: null
      };
      fileListRef.current.push(imgInfo);
    } catch (error) {
      count++;
      console.error(error);
    } finally {
      if (count === originFileList.length) {
        console.log('全部压缩完成', fileListRef.current);
        const newShowPicList = showPicList.map((item) => {
          const _item = fileListRef.current.find((i) => i.uid === item.uid);
          if (_item) return _item;
          return item;
        });
        setShowPicList(newShowPicList);
        setOriginFileList([]);
        count = 0;
        fileListRef.current = [];
      }
    }
  };
  const onBeforeUpload = (file) => {
    // 都是新上传的图片
    console.log(file);
    const fileItem = {
      ...file,
      name: file.name,
      beforeSize: getSizeTrans(file.size),
      data: null,
      compressStatusText: '待压缩',
      compressStatus: 'ing',
      afterSize: null,
      rate: null,
      url: null
    };
    setShowPicList((prev) => [...prev, fileItem]);
    setOriginFileList((prev) => [...prev, file]);
    return false;
  };
  const singleSave = (item) => {
    console.log(item);
    const reader = new FileReader();
    reader.readAsArrayBuffer(item.data);
    reader.onload = function (e) {
      const fileU8A = new Uint8Array(e.target.result);
      fs.writeFile(`${savePath}/compress_${item.name}`, fileU8A, (err) => {
        if (err) {
          console.log('err', err);
        } else {
          api.success({
            message: '保存成功',
            description: '图片已保存到指定目录：' + savePath
          });
        }
      });
    };
  };
  const renderListItem = (item) => {
    console.log(item);
    return (
      <Row key={item.uid} gutter={0} className="img-row" align="middle">
        <Col span={6} className="file-name">
          {item.name}
        </Col>
        <Col span={4}>{item.statusText}</Col>
        <Col span={4}>{item.beforeSize}</Col>
        <Col span={4}>{item.afterSize}</Col>
        <Col span={4}>{item.rate}</Col>
        <Col span={2} className="save-btn" onClick={() => singleSave(item)}>
          保存
        </Col>
      </Row>
    );
  };
  const changeSaveDir = async () => {
    const dir = await ipcRenderer.invoke('dialog:change-save-dir');
    console.log(dir);
    if (dir) {
      setSavePath(dir);
    }
  };
  const handleDownloadAll = async () => {
    console.log(showPicList);
    const _list = showPicList.filter((item) => item.data);
    if (!_list.length) return;
    const zip = new JSZip();
    _list.forEach((item) => {
      zip.file(item.name, item.data);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const file = new FileReader();
      file.readAsArrayBuffer(content);
      file.onload = (e) => {
        const fileU8A = new Uint8Array(e.target.result);
        fs.writeFile(
          `${savePath}/compress_img${new Date().getTime()}.zip`,
          fileU8A,
          (err) => {
            if (err) {
              console.log('err', err);
            } else {
              api.success({
                message: '保存成功',
                description: '图片zip包已保存到指定目录：' + savePath
              });
            }
          }
        );
      };
    });
  };
  return (
    <div className="image-tiny-outer">
      {contextHolder}
      <Dragger
        fileList={null}
        accept="png,jpg,jpeg,gif"
        multiple={true}
        beforeUpload={onBeforeUpload}
        onDrop={handleDrop}
        className="antd-uploader-component"
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
          onClick={changeSaveDir}
          type="primary"
          ghost
          icon={<DownloadOutlined />}
          style={{ marginRight: 5 }}
        >
          图片存储到...
        </Button>
        <Input readOnly value={savePath} />
        <Button
          type="primary"
          style={{ marginLeft: 15 }}
          icon={<FileZipOutlined />}
          onClick={onCompressImage}
        >
          开始压缩
        </Button>
      </div>
      {showPicList.length > 0 ? (
        <div className="img-list-outer">
          <Row gutter={0} className="table-header" align="middle">
            <Col span={6} style={{ textIndent: 8 }}>
              文件名称
            </Col>
            <Col span={4}>状态</Col>
            <Col span={4}>压缩前</Col>
            <Col span={4}>压缩后</Col>
            <Col span={4}>压缩率</Col>
            <Col span={2}>操作</Col>
          </Row>
          <div className="table-body">
            {showPicList.map((item) => renderListItem(item))}
          </div>
          <div className="bottom-actions">
            <div className="action" onClick={handleDownloadAll}>
              一键打包
            </div>
          </div>
        </div>
      ) : (
        <div className="img-list-empty">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default Home;
