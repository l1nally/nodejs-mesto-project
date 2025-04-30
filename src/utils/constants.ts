export enum ERROR_CODES {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export const urlRegex = /^https?:\/\/(www\.)?([\w-]+\.)+[a-zA-Z]{2,}([\w\-.~:/?#[\]@!$&'()*+,;=]*)?#?$/;
export const idRegex = /^[0-9a-fA-F]{24}$/;

export const DEFAULT_JWT_SECRET = 'default_secret';
export const DEFAULT_PORT = 3000;

export const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
export const PORT = process.env.PORT || DEFAULT_PORT;
