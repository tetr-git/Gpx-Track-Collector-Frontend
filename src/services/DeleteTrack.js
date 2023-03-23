import { getToken } from "../utils/GetToken";

const deleteTrack = async (fileName, onSuccess, onError) => {
  try {
    const token = getToken();

    const response = await fetch(
      `${process.env.REACT_APP_GRC_BACKEND_URL}gpx/${fileName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      onError(`Error deleting the file: ${message}`);
      return;
    }

    const data = await response.json();
    onSuccess(data.message);
  } catch (error) {
    console.error("Error in deleteTrack:", error);
    onError("Error deleting the file");
  }
};

export default deleteTrack;
