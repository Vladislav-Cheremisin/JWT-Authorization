import { UserTokensPayload } from "./payloads.js";

type ResponseType<T> = {
  isSuccess: boolean,
  statusCode: number,
  message: string,
  payload: T,
}

type DefaultResponse = ResponseType<null>
type UserTokensResponse = ResponseType<UserTokensPayload>;

export {
  DefaultResponse,
  UserTokensResponse,
}