import { atom } from "recoil";
export const access_token = atom({
  key: "access_token", // unique ID (with respect to other atoms/selectors)
  default: "",
});

export const username = atom({
  key: "username", // unique ID (with respect to other atoms/selectors)
  default: "",
});

export const idEmployeesState = atom({
  key: "idEmployeesState", // vii tri employees
  default: "1", // default value (aka initial value)
});

export const localtionDeliveryDocketState = atom({
  key: "localtionDeliveryDocketState",
  default: 0, // default value (aka initial value)
});

export const localtionReceivedDocketState = atom({
  key: "localtionReceivedDocketState",
  default: 0, // default value (aka initial value)
});

export const localtionCustomerdeliveryDocketDetailsState = atom({
  key: "localtionCustomerdeliveryDocketDetailsState",
  default: 0, // default value (aka initial value)
});

export const localtionCustomerState = atom({
  key: "localtionCustomerState",
  default: 0, // default value (aka initial value)
});

export const localtionCustomerDocketDetailsState = atom({
  key: "localtionCustomerDocketDetailsState",
  default: 0, // default value (aka initial value)
});

export const productState = atom({
  key: "productState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const customersState = atom({
  key: "customersState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const customersDetailState = atom({
  key: "customersDetailState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const employeesState = atom({
  key: "employeesState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const tabState = atom({
  key: "tabState", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

export const receivedDocketsState = atom({
  key: "receivedDocketsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const deliveryDocketsState = atom({
  key: "deliveryDocketsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const key = atom({
  key: "key", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const profileEmployeeState = atom({
  key: "profileEmployeeState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const endpointBook = atom({
  key: "endpointBook", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
