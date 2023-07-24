import React from "react";
import { Layout, theme, Row, Col } from "antd";
import SideBar from "./SideBar";
import Calender from "./Calender";
const { Content } = Layout;
import { Event } from "@app/utils/EventInteerface";
import { Filtering } from "@app/utils/FilteringInterface";

interface LayoutCoursesProps {
  filterEvents: Event[];
  setDate: (date: string) => void;
  setAddModal: (AddModal: boolean) => void;
  events: Event[];
  setFilterEvents: (filterEvents: Event[]) => void;
  setFiltering: (filtering: Filtering) => void;
}

const LayoutCourses: React.FC<LayoutCoursesProps> = ({
  setAddModal,
  setDate,
  filterEvents,
  events,
  setFilterEvents,
  setFiltering,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <SideBar
            setFiltering={setFiltering}
            events={events}
            setFilterEvents={setFilterEvents}
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Calender
              filterEvents={filterEvents}
              setAddModal={setAddModal}
              setDate={setDate}
            />
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default LayoutCourses;
