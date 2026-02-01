import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { deletePost } from '../../../services/postsServices';

export const DeleteBlog = (props) => {
  const { record, onReload } = props;

  const confirm = async e => {
    console.log(e);
    message.success('Click on Yes');
    const res = await deletePost(record.id);
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
        title="Delete the blog"
        description="Are you sure to delete this blog?"
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