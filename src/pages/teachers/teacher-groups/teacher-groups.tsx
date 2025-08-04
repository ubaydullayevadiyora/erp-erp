import { Table, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useTeacherGroups } from "../../../hooks";

const TeacherGroups = () => {
  const { data } = useTeacherGroups();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Group Name",
      dataIndex: ["group", "name"],
      key: "groupName",
      render: (_: string, record: any) => {
        return record.group?.name || "N/A";
      },
    },
    {
      title: "Course Period",
      key: "coursePeriod",
      render: (_: any, record: any) => {
        const startDate = record.start_date || record.group?.start_date;
        const endDate = record.end_date || record.group?.end_date;
        return `${startDate} - ${endDate}`;
      },
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (_: any, record: any) => {
        const startTime = record.group?.start_time;
        const endTime = record.group?.end_time;
        return startTime && endTime ? `${startTime} - ${endTime}` : "N/A";
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => {
        const status = record.group?.status;
        const color =
          status === "active" ? "green" : status === "new" ? "blue" : "default";
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() =>
            navigate(`/teacher/group-students/${record.id}`)
          }
        >
          View
        </Button>
      ),
    },
  ];

  const getTableData = () => {
    let tableData = [];

    if (data?.data?.groups && Array.isArray(data.data.groups)) {
      tableData = data.data.groups;
    } else if (data?.data && Array.isArray(data.data)) {
      tableData = data.data;
    } else if (data && Array.isArray(data)) {
      tableData = data;
    }

    return tableData;
  };

  const tableData = getTableData();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Groups</h1>

      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={(row) => (typeof row === "object" && row !== null && "id" in row ? (row as any).id : row)}
        pagination={false}
        locale={{
          emptyText:
            tableData.length === 0 ? "Ma'lumotlar topilmadi" : "Yuklanmoqda...",
        }}
      />
    </div>
  );
};

export default TeacherGroups;
