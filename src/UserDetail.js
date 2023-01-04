import React, { useState, useEffect } from "react";
import "./index.css";
import { Row, Col, Avatar, Popover, Button } from "antd";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "../node_modules/leaflet/dist/leaflet.css"; // sass
import { Marker } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const UserDetail = (props) => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const onTabSelect = (val) => {
    setSelectedTab(val);
  };
  const icon1 = new L.Icon({
    iconUrl: "/images/redmarker.png",
    iconSize: [30, 30],
  });
  const getUserList = async () => {
    const { data } = await axios.get("https://panorbit.in/api/users.json");
    setUserList(data.users);
  };
  const onUserSelect = (val) => {
    localStorage.setItem("user", JSON.stringify(val));
    setUser(val);
  };
  const onSignOut = () => {
    navigate("/");
  };
  useEffect(() => {
    getUserList();
  }, []);
  const PopOverContent = () => {
    return (
      <div style={{ width: "300px", height: "350px" }}>
        <Row justify={"center"}>
          <Avatar src={user.profilepicture} size={75} />
        </Row>
        <Row justify={"center"}>
          <div style={{ fontWeight: 520, fontSize: "1rem" }}>{user.name}</div>
        </Row>
        <Row justify={"center"}>
          <div style={{ fontSize: "0.75rem", color: "#bdbfbd" }}>
            {user.email}
          </div>
        </Row>
        <div
          style={{ height: "200px", overflowY: "scroll" }}
          id="narrow-scrollbar"
        >
          {userList &&
            userList.map((val) => {
              return (
                <Row
                  justify={"center"}
                  style={{ margin: "10px", cursor: "pointer" }}
                  onClick={onUserSelect.bind(this, val)}
                >
                  <div
                    style={{
                      borderBottom: "1px solid #ebf1eb",
                      width: "100%",
                      margin: "5px",
                    }}
                  ></div>
                  <div style={{ fontSize: "0.9rem" }}>
                    <Avatar
                      src={val.profilepicture}
                      size={25}
                      style={{ marginRight: "10px" }}
                    />
                    {val.name}
                  </div>
                </Row>
              );
            })}
        </div>
        <Row justify={"center"} style={{ marginBottom: "20px" }}>
          <Button
            style={{
              backgroundColor: "#e73a3a",
              borderRadius: "50px",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={onSignOut}
          >
            Sign Out
          </Button>
        </Row>
      </div>
    );
  };
  return (
    <div className="user_container">
      <div className="user_body">
        <div className="user_tabs">
          <Row style={{ width: "100%", margin: "10px" }}>
            <Col lg={22}>
              <span
                className="tab_heading"
                onClick={onTabSelect.bind(this, "profile")}
                style={{
                  color: selectedTab === "profile" ? "white" : "#bdbfbd",
                }}
              >
                Profile
              </span>
              <div
                className="tab_underline"
                style={{
                  borderBottom:
                    selectedTab === "profile"
                      ? "1px solid white"
                      : "1px solid #bdbfbd",
                }}
              ></div>
            </Col>
          </Row>
          <Row style={{ width: "100%", margin: "10px" }}>
            <Col lg={22}>
              <span
                className="tab_heading"
                onClick={onTabSelect.bind(this, "posts")}
                style={{
                  color: selectedTab === "posts" ? "white" : "#bdbfbd",
                }}
              >
                Posts
              </span>
              <div
                className="tab_underline"
                style={{
                  borderBottom:
                    selectedTab === "posts"
                      ? "1px solid white"
                      : "1px solid #bdbfbd",
                }}
              ></div>
            </Col>
          </Row>
          <Row style={{ width: "100%", margin: "10px" }}>
            <Col lg={22}>
              <span
                className="tab_heading"
                onClick={onTabSelect.bind(this, "gallery")}
                style={{
                  color: selectedTab === "gallery" ? "white" : "#bdbfbd",
                }}
              >
                Gallery
              </span>
              <div
                className="tab_underline"
                style={{
                  borderBottom:
                    selectedTab === "gallery"
                      ? "1px solid white"
                      : "1px solid #bdbfbd",
                }}
              ></div>
            </Col>
          </Row>
          <Row style={{ width: "100%", margin: "10px" }}>
            <Col lg={22}>
              <span
                className="tab_heading"
                onClick={onTabSelect.bind(this, "todo")}
                style={{
                  color: selectedTab === "todo" ? "white" : "#bdbfbd",
                }}
              >
                ToDo
              </span>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </div>
        <div className="user_tab_body">
          <Row
            style={{
              width: "100%",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <span
              style={{
                textTransform: "capitalize",
                fontSize: "1.5rem",
                fontWeight: "550",
              }}
            >
              {selectedTab}
            </span>
            <Popover
              placement="bottom"
              content={PopOverContent()}
              trigger="click"
            >
              <span
                style={{
                  marginRight: "50px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  src={user.profilepicture}
                  alt="profile"
                  style={{ marginRight: "10px" }}
                />
                {user.name}
              </span>
            </Popover>
          </Row>
          <div
            style={{
              borderBottom: "1px solid  #bdbfbd",
              marginLeft: "20px",
              marginRight: "10px",
            }}
          ></div>
          {selectedTab === "profile" ? (
            <div className="user_tab_children">
              <div className="left">
                <Avatar
                  src={user.profilepicture}
                  size={150}
                  style={{ marginTop: "20px" }}
                />
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {user.name}
                </div>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Username
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user.username}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    e-mail
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {user.email}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Phone
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user.phone}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    website
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user.website}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "70%",
                    marginTop: "10px",
                    marginBottom: "10px",
                    borderBottom: "1px solid  #bdbfbd",
                  }}
                ></Row>
                <div
                  style={{
                    textAlign: "center",
                    color: "#bdbfbd",
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Company
                </div>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Name
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.company?.name}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    catchphrase
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.company?.catchPhrase}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    bs
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={14}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.company?.bs}
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  borderLeft: "1px solid  #bdbfbd",
                  marginTop: "3%",
                  height: "85%",
                }}
              ></div>
              <div className="right">
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Col
                    lg={14}
                    style={{
                      marginTop: "3%",
                      marginLeft: "50px",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Address :
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "50px",
                  }}
                >
                  <Col
                    lg={6}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Street
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={15}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.address?.street}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "50px",
                  }}
                >
                  <Col
                    lg={6}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Suite
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={15}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.address?.suite}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "50px",
                  }}
                >
                  <Col
                    lg={6}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    City
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={15}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.address?.city}
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "50px",
                  }}
                >
                  <Col
                    lg={6}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "20px",
                    }}
                  >
                    Zipcode
                  </Col>
                  <Col lg={1} style={{ marginLeft: "10px", fontSize: "20px" }}>
                    :
                  </Col>
                  <Col
                    lg={15}
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {user?.address?.zipcode}
                  </Col>
                </Row>
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                >
                  <MapContainer
                    center={[user?.address?.geo?.lat, user?.address?.geo?.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{
                      height: "100%",
                      width: "92.5%",
                      borderRadius: "25px",
                    }}
                    zoomControl={false}
                    preferCanvas={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="http://2.aerial.maps.api.here.com/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/png?app_id=zgwK7bZTFba38fRDUwzW&app_code=FVzO8hCsBKBm1kusNhItwA"
                    />
                    <Marker
                      position={[
                        user?.address?.geo?.lat,
                        user?.address?.geo?.lng,
                      ]}
                      icon={icon1}
                    ></Marker>
                  </MapContainer>
                </div>
                <Row justify="end" style={{ marginRight: "50px" }}>
                  <span
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "15px",
                    }}
                  >
                    Lat
                  </span>
                  <span style={{ fontSize: "15px" }}>:</span>
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {user?.address?.geo?.lat}
                  </span>
                  <span
                    lg={8}
                    style={{
                      textAlign: "right",
                      color: "#bdbfbd",
                      fontSize: "15px",
                      marginLeft: "10px",
                    }}
                  >
                    Long
                  </span>
                  <span style={{ fontSize: "15px" }}>:</span>
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {user?.address?.geo?.lng}
                  </span>
                </Row>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                fontSize: "100px",
                fontWeight: 1000,
                color: "#dad9d9",
              }}
            >
              Coming Soon
            </div>
          )}
        </div>
      </div>
      <Row justify={"end"}>
        <div
          style={{
            width: "200px",
            height: "30px",
            marginRight: "75px",
            backgroundColor: "#4054c8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: " 10px 10px 0 0",
          }}
        >
          <span style={{ marginLeft: "10px", color: "white" }}>
            <i
              class="far fa-comment-alt"
              style={{ color: "white", marginRight: "10px" }}
            ></i>
            Chats
          </span>
          <span style={{ marginRight: "10px", color: "white" }}>
            <i class="fas fa-angle-up" style={{ color: "white" }}></i>
          </span>
        </div>
      </Row>
    </div>
  );
};
