import moment from "moment-timezone";

export const routes = {
  ROOT: "/",
  EVENT: "/event",
  EDIT_EVENT: "/event/:id",
  EVENTS: "/events",
};

export const event_types = ["sports", "music", "general", "children", "school"];

export const dummyData = [
  {
    id: 1,
    event_name: "Test event 1",
    start_date: moment(),
    end_date: moment().add(3, "days"),
    event_type: "music",
    description:
      "Lorem ipsum the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recen",
    handle_by: "Tony Stark",
    organisation: "Stark Industries",
    sub_events: 5,
  },
  {
    id: 2,
    event_name: "Test event 2",
    start_date: moment(),
    end_date: moment().add(5, "days"),
    event_type: "sports",
    description:
      "Lorem ipsum the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recen",
    handle_by: "Bruce Wayne",
    organisation: "Wayne Industries",
    sub_events: 4,
  },
];
