import React, { useCallback, useEffect, useState } from "react";
import "./AddEvent.scss";
import { Button, Col, DatePicker, Input, Popconfirm, Row, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
import { event_types, routes } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, deleteEvent, updateEvent } from "./duck/EventReducer";

const AddEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event_id = Number(useParams()?.id);

  const [eventDetails, setEventDetails] = useState({});
  const [error, setError] = useState({});

  const mEvent = useSelector(({ event }) => {
    if (event_id) return event.events.find((event) => event.id === event_id);
  });

  useEffect(() => {
    if (mEvent) {
      setEventDetails(mEvent);
    }
  }, [mEvent]);

  const handleChange = useCallback(
    (name) => (event) => {
      let value = event?.target?.value ?? event?.target?.checked ?? event;
      if (name === "sub_events") {
        value = value.replace(/[^0-9]/g, "");
      }

      setError({});
      setEventDetails((pre) => ({
        ...pre,
        [name]: value,
      }));
    },
    []
  );

  const hasError = useCallback(() => {
    let {
      event_name,
      start_date,
      end_date,
      event_type,
      handle_by,
      organisation,
      sub_events,
    } = eventDetails;
    event_name = event_name?.trim();
    handle_by = handle_by?.trim();
    organisation = organisation?.trim();

    let error = {};
    if (!event_name) {
      error.event_name = "Please enter name";
    }
    if (!event_type) {
      error.event_type = "Please select a type";
    }

    if (!start_date) {
      error.start_date = "Please select start date";
    }
    if (!end_date) {
      error.end_date = "Please select end date";
    }
    if (!organisation) {
      error.organisation = "Please enter organisation";
    }
    if (!handle_by) {
      error.handle_by = "Please enter handle by";
    }
    if (!sub_events) {
      error.sub_events = "Please enter number of sub events";
    }

    setError(error);
    return !!Object.keys(error).length;
  }, [eventDetails]);

  const onSubmit = useCallback(() => {
    if (!hasError()) {
      const payload = Object.assign({}, eventDetails);
      if (event_id) {
        payload.id = event_id;
        dispatch(updateEvent(payload));
        navigate(routes.EVENTS);
      } else {
        dispatch(addEvent(payload));
        setEventDetails({});
      }
    }
  }, [dispatch, eventDetails, event_id, hasError, navigate]);

  const onRemove = useCallback(() => {
    const payload = {
      id: event_id,
    };
    dispatch(deleteEvent(payload));
    navigate(routes.EVENTS);
  }, [dispatch, event_id, navigate]);

  let {
    event_name,
    start_date,
    end_date,
    event_type,
    description,
    handle_by,
    organisation,
    sub_events,
  } = eventDetails;

  if (event_id && !mEvent) {
    return (
      <div>
        <h3>Event you are looking does not exist</h3>

        <Button
          size="large"
          type="primary"
          onClick={() => navigate(routes.EVENTS)}
        >
          Show All Events
        </Button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>{event_id ? "Edit" : "Add new"} Event</h2>
        <Button
          size="large"
          type="primary"
          onClick={() => navigate(routes.EVENTS)}
        >
          Show All Events
        </Button>
      </div>
      {/* Event name start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Col>
            <label className="label">Event Name</label>
            <sup style={{ color: "red" }}>*</sup>
          </Col>
          <Col>
            <Input
              size="large"
              type="text"
              value={event_name}
              placeholder="Team outing"
              onChange={handleChange("event_name")}
            />

            <Row className="error mt5">{error?.event_name}</Row>
          </Col>
        </Col>
      </Row>
      {/* Event name end */}

      {/* Event type start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Col>
            <label className="label">Event Type</label>
            <sup style={{ color: "red" }}>*</sup>
          </Col>
          <Col>
            <Select
              className="fw"
              size="large"
              placeholder={"Event type"}
              value={event_type}
              onChange={handleChange("event_type")}
              getPopupContainer={(trigger) => trigger.parentNode}
              allowClear
              showSearch
            >
              {event_types.map((event, i) => (
                <Select.Option key={i} value={event}>
                  {event}
                </Select.Option>
              ))}
            </Select>

            <Row className="error mt5">{error?.event_type}</Row>
          </Col>
        </Col>
      </Row>
      {/* Event type end */}

      {/* Event date start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Row>
            <Col span={12} className="mb10">
              <Col>
                <label className="label">Start date</label>
                <sup style={{ color: "red" }}>*</sup>
              </Col>
              <Col>
                <DatePicker
                  style={{ width: "95%" }}
                  size="large"
                  format={"DD-MM-YYYY"}
                  onChange={handleChange("start_date")}
                  placeholder="From"
                  value={start_date}
                  disabledDate={(current) => current <= moment().startOf("day")}
                  inputReadOnly={true}
                  allowClear
                />

                <Row className="error mt5">{error?.start_date}</Row>
              </Col>
            </Col>
            <Col span={12} className="mb10">
              <Col>
                <label className="label">End date </label>
                <sup style={{ color: "red" }}>*</sup>
              </Col>
              <Col>
                <DatePicker
                  className="fw"
                  format={"DD-MM-YYYY"}
                  size="large"
                  onChange={handleChange("end_date")}
                  placeholder="To"
                  value={end_date}
                  disabledDate={(current) => current <= moment().startOf("day")}
                  inputReadOnly={true}
                  allowClear
                />

                <Row className="error mt5">{error?.end_date}</Row>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Event date end */}

      {/* Event description start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Col>
            <label className="label">Description</label>
          </Col>
          <Col>
            <Input.TextArea
              className="input input-area"
              placeholder="Let us know your description, here"
              value={description}
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={handleChange("description")}
              size="large"
            />
          </Col>
        </Col>
      </Row>
      {/* Event description end */}

      {/* Event handled by start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Col>
            <label className="label">Handled by</label>
            <sup style={{ color: "red" }}>*</sup>
          </Col>
          <Col>
            <Input
              size="large"
              type="text"
              value={handle_by}
              placeholder="Jhon Doe"
              onChange={handleChange("handle_by")}
            />

            <Row className="error mt5">{error?.handle_by}</Row>
          </Col>
        </Col>
      </Row>
      {/* Event handled by end */}

      {/* Event Organisation start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Col>
            <label className="label">Organisation</label>
            <sup style={{ color: "red" }}>*</sup>
          </Col>
          <Col>
            <Input
              size="large"
              type="text"
              value={organisation}
              placeholder="Wayne Industries"
              onChange={handleChange("organisation")}
            />

            <Row className="error mt5">{error?.organisation}</Row>
          </Col>
        </Col>
      </Row>
      {/* Event Organisation end */}

      {/* Event sub-events start */}
      <Row>
        <Col xs={24} sm={24} md={12} lg={10} xl={8} className="mb10">
          <Col>
            <label className="label">Total number of sub-events</label>
            <sup style={{ color: "red" }}>*</sup>
          </Col>
          <Col>
            <Input
              size="large"
              type="text"
              value={sub_events}
              placeholder="Integers only"
              onChange={handleChange("sub_events")}
            />

            <Row className="error mt5">{error?.sub_events}</Row>
          </Col>
        </Col>
      </Row>
      {/* Event sub-events end */}

      {/* CRUD button start */}
      <Col>
        <Button
          size="larger"
          className="mr10"
          type="primary"
          onClick={onSubmit}
        >
          Save
        </Button>
        {!!event_id && (
          <Popconfirm
            title="Delete the event"
            description="Are you sure to delete this event?"
            onConfirm={onRemove}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        )}
      </Col>
      {/* CRUD button end */}
    </div>
  );
};

export default AddEvent;
