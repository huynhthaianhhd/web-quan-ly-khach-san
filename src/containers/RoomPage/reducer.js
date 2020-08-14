import {
  GET_LIST_ROOM,
  UPDATE_CHECK_IN_CUSTOMER,
  UPDATE_CHECK_IN_ROOM,
  GET_LIST_CUSTOMER_TYPE,
  CHECK_OUT,
} from './constants';

let initState = {
  listRoom: null,
  listCustomerType: null,
  checkInCustomer: {},
  checkInRoom: {},
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_ROOM:
      state.listRoom = action.listRoom;
      return { ...state };

    case GET_LIST_CUSTOMER_TYPE:
      state.listCustomerType = action.listCustomerType;
      return { ...state };

    case UPDATE_CHECK_IN_CUSTOMER:
      state.checkInCustomer = action.customer;
      return { ...state };

    case UPDATE_CHECK_IN_ROOM:
      state.checkInRoom = action.room;
      return { ...state };

    case CHECK_OUT:
      state.checkInRoom = { ...state.checkInRoom, ...action.checkOutInfo };
      console.log('state.checkInRoom', state.checkInRoom);

      return { ...state };

    default:
      return { ...state };
  }
};

export default roomReducer;
