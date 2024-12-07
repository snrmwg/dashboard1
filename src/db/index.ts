import * as schema from "./schema";
import * as relations from "./relations";

import { LibSQLDatabase } from "drizzle-orm/libsql";

export type MessenDatabase = LibSQLDatabase<typeof schema & typeof relations>;

export default { ...schema, ...relations };  // für drizzle({ client, schema })
export * from "./schema";  // für direkten Import von Tabellen
export * from "./relations";  // für direkten Import von Relationen
