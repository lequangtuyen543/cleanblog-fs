import { useTableData }  from "../../../helpers/useTableData";
import { DataToolbar }   from "../../../components/DataToolbar";
import { DataTable }     from "../../../components/DataTable";
import { blogColumns }   from "./blogColumns";
import { posts }         from "../../../services/postsServices";

export const BlogList = () => {
  const { data, loading, pagination, handleTableChange, onSearch, handleReload }
    = useTableData(posts);  // ← truyền service vào đây

  return (
    <>
      <h3>Blog List</h3>
      <DataToolbar
        onSearch={onSearch}
        createPath="/admin/create-blog"
        createLabel="Create Blog"
        searchPlaceholder="Search by title..."
      />
      <DataTable
        columns={blogColumns(handleReload)}
        data={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};