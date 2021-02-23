export function production() {
    return process.env.NODE_ENV === 'production';
}

export function test() {
    return process.env.NODE_ENV === 'test' || process.env.NODE_ENV == undefined;
}

export function sandbox() {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';
}

export function getOldApiBaseUrl() {
    return process.env.LEGACY_SHARGO_URL
}
export function getDatabaseUrl() {
    return `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
}
