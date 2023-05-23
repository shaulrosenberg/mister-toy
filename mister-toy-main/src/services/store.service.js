import { httpService } from "./http.service";

const BASE_URL = 'store/'

export function query() {
    return httpService.get(BASE_URL)
}

export const storeService = {
    query
}