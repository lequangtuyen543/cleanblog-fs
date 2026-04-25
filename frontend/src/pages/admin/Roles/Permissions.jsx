import { useState, useEffect } from "react";
import { Table, Checkbox, Button, Typography, message } from "antd";
import { getRoles, updatePermissionsMulti } from "../../../services/rolesServices";

const { Title } = Typography;

const permissionStructure = [
  {
    group: "Posts",
    permissions: [
      { key: "posts_view", label: "View" },
      { key: "posts_create", label: "Create" },
      { key: "posts_edit", label: "Edit" },
      { key: "posts_delete", label: "Delete" },
    ],
  },
  {
    group: "Users",
    permissions: [
      { key: "users_view", label: "View" },
      { key: "users_create", label: "Create" },
      { key: "users_edit", label: "Edit" },
      { key: "users_delete", label: "Delete" },
    ],
  },
  {
    group: "Roles",
    permissions: [
      { key: "roles_view", label: "View" },
      { key: "roles_create", label: "Create" },
      { key: "roles_edit", label: "Edit" },
      { key: "roles_delete", label: "Delete" },
      { key: "roles_permissions", label: "Permissions" },
    ],
  },
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState([]);
  const [permissionState, setPermissionState] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);

    // Convert permissions sang object để check nhanh
    const initState = {};
    res.data.forEach((role) => {
      initState[role._id] = {};
      role.permissions.forEach((p) => {
        initState[role._id][p] = true;
      });
    });

    setPermissionState(initState);    
  };

  const handleCheckboxChange = (roleId, permissionKey) => {
    setPermissionState((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionKey]: !prev[roleId]?.[permissionKey],
      },
    }));
  };

  const handleSubmit = async () => {
    const data = roles.map((role) => ({
      id: role._id,
      permissions: Object.keys(permissionState[role._id] || {}).filter(
        (key) => permissionState[role._id][key]
      ),
    }));

    try {
      const result = await updatePermissionsMulti({
        permissions: data,
      });

    if (result && result.code === 200) {
      messageApi.success(result.message || "Cập nhật phân quyền thành công!");
    } else{
      messageApi.error(result.message || "Cập nhật phân quyền thất bại!");
    }
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi cập nhật phân quyền!", error);
    } 
    
  };

  // Tạo columns động theo roles
  const columns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
      width: 200,
    },
    ...roles.map((role) => ({
      title: role.title,
      key: role._id,
      align: "center",
      render: (_, record) => {
        if (record.isGroup) return null;

        return (
          <Checkbox
            checked={
              permissionState[role._id]?.[record.permissionKey] || false
            }
            onChange={() =>
              handleCheckboxChange(role._id, record.permissionKey)
            }
          />
        );
      },
    })),
  ];

  // Tạo dataSource
  const dataSource = [];

  permissionStructure.forEach((group) => {
    dataSource.push({
      key: group.group,
      feature: <b>{group.group}</b>,
      isGroup: true,
    });

    group.permissions.forEach((p) => {
      dataSource.push({
        key: p.key,
        feature: p.label,
        permissionKey: p.key,
      });
    });
  });

  return (
    <div>
      {contextHolder}

      <Title level={3}>Roles Permissions</Title>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={handleSubmit}
      >
        Update
      </Button>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        size="small"
      />
    </div>
  );
}