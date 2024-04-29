type dbOperationResult = {
  isSuccess: boolean,
  statusCode: number,
  message: string,
}

function isErrorObject(error: unknown): error is Error {
  if (error && typeof error === 'object' && 'message' in error) {
    return true;
  }

  return false;
}

export {
  dbOperationResult,
  isErrorObject,
}