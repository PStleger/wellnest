const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Route params are user input; malformed ids are rejected before reaching Postgres. */
export function isUuid(value: string) {
  return UUID.test(value);
}
