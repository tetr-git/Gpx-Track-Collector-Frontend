import { getToken } from "../utils/GetToken";

const uploadFile = (file, onResetView, onResponseMessage) => {
  const formData = new FormData();
  formData.append("file", file);

  const token = getToken();

  fetch(`${process.env.REACT_APP_GRC_BACKEND_URL}upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      onResponseMessage(data.message);
      onResetView();
    })
    .catch((error) => {
      onResponseMessage(error.message);
    });
};

export default uploadFile;
