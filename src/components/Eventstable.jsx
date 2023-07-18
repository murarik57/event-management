import { Button, Input, Row, Space, Table, Tooltip } from "antd";
import React, { useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/constants";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import getTableColumns from "./table-content/TableColumns";

const Eventstable = () => {
  const navigate = useNavigate();

  const events = useSelector(({ event }) => event.events);

  // Handle search start
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 10,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={"Search"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) {
                handleReset(clearFilters);
                handleSearch(selectedKeys, confirm, dataIndex);
              }
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          fontSize: 17,
          color: filtered ? "red" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const data = useMemo(() => {
    let mData = [];

    events.forEach((event, index) => {
      mData.push({
        key: event.id,
        sn: ++index,
        ...event,
        view: (
          <Tooltip placement="top" title={"View Details"}>
            <EditOutlined
              className="ml10"
              onClick={() => navigate(`${routes.EVENT}/${event.id}`)}
            />
          </Tooltip>
        ),
      });
    });

    return mData;
  }, [events, navigate]);

  return (
    <div className="container">
      <div className="header">
        <h2>List of Events</h2>
        <Button
          size="large"
          type="primary"
          onClick={() => navigate(routes.ROOT)}
        >
          Add New Event
        </Button>
      </div>
      <Row>
        <Table
          className="fw"
          columns={getTableColumns(getColumnSearchProps)}
          dataSource={data}
          pagination={{
            showSizeChanger: false,
          }}
        />
      </Row>
    </div>
  );
};

export default Eventstable;
