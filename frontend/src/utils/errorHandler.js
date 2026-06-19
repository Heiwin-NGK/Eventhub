export const getErrorMessage = (error) => {
   if (!error.response) {
    return error.message || "Unexpected Error";
  }
  switch (error.response.status) {
    case 400:
      return error.response.data?.message || "Invalid request.";
    case 401:
      return "Session expired. Please login again.";
    case 403:
      return (
        error.response.data?.message ||
        "Access denied. You do not have permission to perform this action."
      );
    case 404:
      return (
        error.response.data?.message ||
        "Requested resource was not found."
      );
    case 409:
      return (
        error.response.data?.message ||
        "Conflict occurred."
      );
    case 500:
      return (
        error.response.data?.message ||
        "Internal server error."
      );
    default:
      return (
        error.response.data?.message ||
        "Something went wrong."
      );
  }
};