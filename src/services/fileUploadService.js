const uploadFile = (file, onResetView, onResponseMessage) => {
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:3003/api/upload", {
    method: "POST",
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
