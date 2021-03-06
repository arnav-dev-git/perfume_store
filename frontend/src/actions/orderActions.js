import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log(userInfo, " <= userInfo");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    console.log(data, " <- data");
    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data,
    });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ORDER_PAY_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      console.log(data, " <- data");
      dispatch({
        type: "ORDER_PAY_SUCCESS",
        payload: data,
      });

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log("error: ", error);
      dispatch({
        type: "ORDER_PAY_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
