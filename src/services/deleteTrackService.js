const deleteTrack = async (fileName, onSuccess, onError) => {
  try {
    const response = await fetch(`http://localhost:3003/api/gpx/${fileName}`, {
      method: "DELETE",
    });

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
