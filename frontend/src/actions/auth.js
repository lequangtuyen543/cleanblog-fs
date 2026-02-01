// actions/auth.js
export const checkAuthen = (status) => {
  return {
    type: "CHECK_AUTHEN",
    status: status, // hoặc có thể đặt là payload
  };
};
