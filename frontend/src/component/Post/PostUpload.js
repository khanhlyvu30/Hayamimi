import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FirebaseController from "../../firebase.js";

function PostUpload() {
  const { TextArea } = Input;
  const [status, setStatus] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleCancel = () => setPreviewVisible(false);

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadImageButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const uploadPost = () => {
    let data = {
      content: status,
      date: new Date(),
      like: [],
      uid: FirebaseController.getCurrentUser().uid,
    };
    // console.log(data);
    FirebaseController.uploadPost(data);
    setStatus("");
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Card title="Home">
        <TextArea
          placeholder="What's happening?"
          value={status}
          autoSize={{ minRows: 2 }}
          onChange={handleChange}
        />
        <Button
          type="primary"
          style={{ float: "right", marginTop: 15 }}
          onClick={uploadPost}
        >
          Upload
        </Button>
      </Card>
    </div>
  );
}

export default PostUpload;
