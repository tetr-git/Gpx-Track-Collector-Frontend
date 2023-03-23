import axios from "axios";
import { saveAs } from "file-saver";
import { getToken } from "../utils/getToken";

const downloadTrack = async (fileName, onSuccess, onError) => {
  try {
    const token = getToken();

    const response = await axios.get(
      `http://localhost:3003/api/gpx/download/${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    if (response.status !== 200) {
      onError(`Error downloading the file`);
      return;
    }

    const blob = new Blob([response.data], { type: "application/gpx+xml" });
    saveAs(blob, fileName);

    onSuccess("File downloaded successfully");
  } catch (error) {
    console.error("Error in downloadTrack:", error);
    onError("Error downloading the file");
  }
};
export default downloadTrack;
