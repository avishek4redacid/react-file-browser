import React from 'react'
import { Breadcrumb } from 'antd';

function TopBar(props) {
  const { location } = props;
  return (
    <div className="top-bar">
      <Breadcrumb separator="/">
        <Breadcrumb.Item onClick={() => props.setLocation("")}>Home</Breadcrumb.Item>
         {location.map(({ id, name, type }) => (
            <Breadcrumb.Item className="pointer" onClick={() => props.setLocation(id)}>{name}</Breadcrumb.Item>
         ))}
      </Breadcrumb>
    </div>
  )
}

export default TopBar