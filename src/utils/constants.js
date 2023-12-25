export const PAGE_SIZE = 10; // the number of records each page on table
export const IMG_URL = '/files/';
export const BASE = import.meta.env.DEV ? "http://localhost:8080" : "";
export const BASEURL = BASE + '/api';

export const IMAGE_UPLOAD_URL = `${BASE}${IMG_URL}`;
export const IMAGE_UPLOAD = `${BASEURL}/upload/image`;
