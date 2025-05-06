import React, { useState } from 'react';
import { Upload, Button, Form, Input, message, Modal, Select } from 'antd';
import { UploadOutlined, PictureOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { User } from '../utils/types';
import { addUserPhoto } from '../utils/userPhotoData';
import { attractions } from '../utils/data';

const { TextArea } = Input;
const { Option } = Select;

const UploaderContainer = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed #d9d9d9;
`;

interface PhotoUploaderProps {
  currentUser: User | null;
  onPhotoUploaded: () => void;
}

// 将文件转换为Base64
const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ currentUser, onPhotoUploaded }) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  // 获取所有可用的分类
  const categories = [...new Set(attractions.map(item => item.category))];

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleSubmit = async (values: any) => {
    if (!currentUser) {
      message.error('请先登录');
      return;
    }

    if (fileList.length === 0) {
      message.error('请上传照片');
      return;
    }

    const file = fileList[0];
    let photoUrl = file.url;
    
    if (!photoUrl && file.originFileObj) {
      try {
        photoUrl = await getBase64(file.originFileObj);
      } catch (error) {
        message.error('图片处理失败');
        return;
      }
    }

    // 添加新照片
    addUserPhoto({
      url: photoUrl,
      title: values.title,
      description: values.description,
      user: currentUser,
      category: values.category
    });

    message.success('照片上传成功！');
    form.resetFields();
    setFileList([]);
    onPhotoUploaded();
  };

  // 如果用户未登录，显示提示信息
  if (!currentUser) {
    return (
      <UploaderContainer style={{ textAlign: 'center' }}>
        <PictureOutlined style={{ fontSize: 48, color: '#c41e3a' }} />
        <p>请登录后上传您的照片</p>
      </UploaderContainer>
    );
  }

  return (
    <UploaderContainer>
      <h3>分享您的红色旅游照片</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="照片标题"
          rules={[{ required: true, message: '请输入照片标题' }]}
        >
          <Input placeholder="给您的照片起个标题" />
        </Form.Item>

        <Form.Item
          name="description"
          label="照片描述"
        >
          <TextArea 
            placeholder="描述一下这张照片的故事..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="分类"
          rules={[{ required: true, message: '请选择照片分类' }]}
        >
          <Select placeholder="选择照片分类">
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="上传照片"
          required
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={(file) => {
              // 检查文件类型
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('只能上传图片文件！');
              }
              // 返回false阻止自动上传，我们将在表单提交时手动处理
              return false;
            }}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            发布照片
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewVisible}
        title="照片预览"
        footer={null}
        onCancel={handleCancel}
      >
        {previewImage && <img alt="预览" style={{ width: '100%' }} src={previewImage} />}
      </Modal>
    </UploaderContainer>
  );
};

export default PhotoUploader;