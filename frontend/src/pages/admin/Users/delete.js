import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { usersDelete } from '../../../services/usersService';

export const DeleteUser = (props) => {
  const { record, onReload } = props;

  const confirm = async e => {
    message.success('Click on Yes');
    const res = await usersDelete(record._id);
    console.log("res delete", res);
    if (res) {
      onReload();
    }
  };
  const cancel = e => {
    message.error('Click on No');
  };

  return (
    <Tooltip title="Delete">
      <Popconfirm
        title="Delete the user"
        description="Are you sure to delete this user?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </Tooltip>
  )
}