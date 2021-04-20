// library imports
import React, { useState } from 'react'
import {
  FolderAddFilled, DownOutlined, UnorderedListOutlined, FolderFilled, FileFilled
  , DeleteOutlined
} from '@ant-design/icons';

import { Modal, Input } from 'antd';
// interfaces
function MainBody(props) {
  const { items, location } = props;

  var currLocationId = null;
  if (location && location.length) {
    currLocationId = location[location.length - 1].id;
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderName, handleInputChange] = useState("");

  const showModal = () => {
    handleInputChange("");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (folderName) {
      props.createFolder({ currLocationId, name: folderName });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="row col-md-12">
      <div className="form-group has-search col-md-2">
        <span className="fa fa-search form-control-feedback"></span>
        <input type="text" className="form-control search-bar" placeholder="Search" />
      </div>
      <div className="col-md-2 item"><span>{items.length} item</span></div>
      <div className="col-md-1" />
      <div className="col-md-2 item" onClick={showModal}>
        <FolderAddFilled /><span>Create Folder</span>
      </div>
      <div className="col-md-2 item"><DownOutlined /><span>Actions</span></div>
      <div className="col-md-1 item"><UnorderedListOutlined /></div>
      <div className="col-md-2 item"><DownOutlined /><span>Options</span></div>
      <div className="row col-md-12 table-folder">
        <table style={{ width: '100%' }}>
          {items.map(({ id, name, type }) => (
            <tr className="tab-row item" onDoubleClick={() => props.setLocation(id)}>
              <td style={{ width: '25%' }}>{type === 'folder' ? <FolderFilled /> : <FileFilled />} {name}</td>
              <td style={{ width: '25%' }}>-</td>
              <td style={{ width: '25%' }}>Apr 4, 2021, 3.36 PM</td>
              <td style={{ width: '25%' }}><span onClick={() => props.deleteFolder({ id, currLocationId })}><DeleteOutlined /></span></td>
            </tr>
          ))}

        </table>
      </div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input value={folderName} onChange={e => handleInputChange(e.target.value)} />
      </Modal>
    </div>
  );
}


export default MainBody;
