import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { deleteUser } from '../../../services/usersService';

export const DeleteUser = (props) => {
  const { record, onReload } = props;

  const confirm = async e => {
    console.log(e);
    message.success('Click on Yes');
    const res = await deleteUser(record.id);
    if (res) {
      onReload();
    }
  };
  const cancel = e => {
    console.log(e);
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