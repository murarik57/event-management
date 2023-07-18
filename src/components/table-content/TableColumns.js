import { Col, Row } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment-timezone";

const getTableColumns = (getColumnSearchProps) => {
  return [
    {
      title: "S.no",
      dataIndex: "sn",
      key: "sn",
      align: "center",
      width: 70,
    },
    {
      title: "Event Name",
      dataIndex: "event_name",
      width: 180,
      ellipsis: true,
      ...getColumnSearchProps("event_name"),
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
      width: 130,
      sorter: (a, b) => a.event_type.localeCompare(b.event_type),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      ellipsis: true,
      width: 165,
      sorter: (a, b) =>
        moment(a.start_date).unix() - moment(b.start_date).unix(),
      render: (date) => {
        return (
          <Row justify="start" align="middle">
            <Col justify="center" align="middle">
              <CalendarOutlined className="mr5" />
              {date.format("ddd, MMMM Do, YYYY")}
            </Col>
          </Row>
        );
      },
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      ellipsis: true,
      width: 165,
      sorter: (a, b) => moment(a.end_date).unix() - moment(b.end_date).unix(),
      render: (date) => {
        return (
          <Row justify="start" align="middle">
            <Col justify="center" align="middle">
              <CalendarOutlined className="mr5" />
              {date.format("ddd, MMMM Do, YYYY")}
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Organised By",
      dataIndex: "organisation",
      width: 130,
      ellipsis: true,
      ...getColumnSearchProps("organisation"),
    },
    {
      title: "Handled by",
      dataIndex: "handle_by",
      width: 130,
      ellipsis: true,
      ...getColumnSearchProps("handle_by"),
    },
    {
      title: "Sub events",
      dataIndex: "sub_events",
      sorter: (a, b) => a.sub_events - b.sub_events,
      width: 130,
      ellipsis: true,
    },
    {
      dataIndex: "view",
      key: "view",
      align: "center",
      width: 60,
    },
  ];
};

export default getTableColumns;
