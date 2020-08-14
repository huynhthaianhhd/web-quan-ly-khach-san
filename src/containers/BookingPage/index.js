import React, { Component } from "react";
import { Button, message, Pagination } from "antd";
import {
  Drawer,
  Form,
  Col,
  Row,
  Input,
  DatePicker,
  Divider,
  Select,
  InputNumber,
} from "antd";
import DrawerUser from "../../components/DrawerUser";
import TableUser from "../../components/TableUser";
import moment from "moment";
import { UserAddOutlined } from "@ant-design/icons";
import createPage from "../../components/createPage";
import axios from "axios";
import "antd/dist/antd.css";
import { BOOKING_PAGE } from "../../components/Sidebar/constants";
import BookDrawer from "./BookDrawer"
const URL = process.env.SERV_HOST || "http://localhost:8000";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      listCustomerType: [],
      listRoomByType: [],
      listTypeRoom: [],
      dateTime:[],
      idRoom: "",
      idTypeRoom: "",
      typeRoom: "",
      priceRoom: "",
      valueForm: React.createRef(),
    };
  }
 
  handleOnChangeDateTime = (value) => {
  const dateIn = moment(value[0]).format('YYYY-MM-DD hh:mm');
  const dateOut = moment(value[1]).format('YYYY-MM-DD hh:mm');
  this.setState({
    dateTime: [dateIn,dateOut],
  });
  };
  handleOnClose =() => {
    this.setState({ visible: false });
  }
  handleOnChangeSelectRoom = (value) => {
    this.setState(
      {
        idRoom: value,
      },
      () => {
        this.getNameTypeAndPrice();
      }
    );
  };
  handleOnChangeSelectTypeRoom = (value) => {
    this.setState(
      {
        idTypeRoom: value,
      },
      () => {
        this.getListRoomByType();
      }
    );
  };
  getListRoomByType = () => {
    console.log(this.state.idTypeRoom);
    axios({
      method: "POST",
      url: `${URL}/room/listRoomByType`,
      data: {
        id: this.state.idTypeRoom,
        dateIn: this.state.dateTime[0],
        dateOut: this.state.dateTime[1],
      },
    })
      .then((result) => {
        let data = result.data;
        console.log(data);
        this.setState({
          listRoomByType: data,
        });
      })
      .catch((err) => {
        if (err && err.response) {
        }
      });
  };
  handleOnChangeSelectCusType = (value) => {
    this.setState({
      idTypeRoom: value,
    });
  };
  getListType = () => {
    axios
      .get(`${URL}/customer/listType`)
      .then((res) => {
        if (res.data) {
          let { listCustomerType } = res.data;
          this.setState({
            listCustomerType: listCustomerType,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  getListTypeRoom = () => {
    axios
      .get(`${URL}/room/listTypeRoom`)
      .then((res) => {
        if (res.data) {
          let listTypeRoom = res.data;
          this.setState({
            listTypeRoom: listTypeRoom,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getNameTypeAndPrice = () => {
    console.log(this.state.idRoom);
    axios({
      method: "POST",
      url: `${URL}/room/roomCurrent`,
      data: {
        id: this.state.idRoom,
      },
    })
      .then((result) => {
        let data = result.data;
        console.log(data[0].name);
        this.setState({
          typeRoom: data[0].name,
          priceRoom: data[0].price,
        });
      })
      .catch((err) => {
        if (err && err.response) {
        }
      });
  };
  componentDidMount() {
    this.getListType();
    this.getListTypeRoom();
  }
  submitBooking = () => {
    var data = this.state.valueForm.current.getFieldsValue();
    let customerBook = {
      idNumber: data.idNumber,
      name: data.cusName,
      idType: data.idCusType,
      phone: data.phone,
    };
    let roomBook = {
      idRoom: this.state.idRoom,
      idTypeRoom: this.state.idTypeRoom,
      price: this.state.priceRoom,
      date: data.dateTime,
    };
    let dataSend = {
      bookCustomer: customerBook,
      bookRoom: roomBook,
    };
    axios({
      method: "POST",
      url: `${URL}/booking/bookRoom`,
      data: dataSend,
    }).then((result) => {
      console.log(result.data);
    });
  };
  render() {
    const { listCustomerType, listTypeRoom,listRoomByType,visible } = this.state;
    return (
      <div>
        <div className="header-table">
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            Add User
          </Button>
          <BookDrawer dataForm={this.state} handleOnChangeSelectCusType={this.handleOnChangeSelectCusType} handleOnClose ={this.handleOnClose} submitBooking={this.submitBooking} handleOnChangeSelectTypeRoom={this.handleOnChangeSelectTypeRoom} handleOnChangeDateTime={this.handleOnChangeDateTime} handleOnChangeSelectRoom={this.handleOnChangeSelectRoom}></BookDrawer>
        </div>
      </div>
    );
  }
}
const BookingPage = createPage(Booking, BOOKING_PAGE);
export default BookingPage;