export const getErrorMessage = (error) => {
  if (!error.response) {
    return "Unable to connect to the server.";
  }

  switch (error.response.status) {
    case 400:
      return error.response.data?.message || "Bad Request";

    case 401:
      return "Unauthorized. Please login again.";

    case 403:
      return "Access Denied.";

    case 404:
      return "Resource Not Found.";

    case 409:
      return error.response.data?.message || "Conflict occurred.";

    case 500:
      return "Internal Server Error.";

    default:
      return (
        error.response.data?.message ||
        "Something went wrong."
      );
  }
};