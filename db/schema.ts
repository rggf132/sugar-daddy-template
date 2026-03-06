import {
  bigint,
  boolean,
  double,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  description: varchar('description', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }).defaultNow(),
  image: varchar('image', { length: 255 }),
  isAdmin: boolean('is_admin').default(false),
})

export const account = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', {
      length: 255,
    }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const session = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const event = mysqlTable(
  'event',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 191 }),
    description: varchar('description', { length: 191 }),
    entry_type: mysqlEnum('entry_type', ['Free', 'Paid']),
    cost: double('cost'),
    start: timestamp('start', { mode: 'string' }),
    end: timestamp('end', { mode: 'string' }),
    file_key: varchar('file_key', { length: 255 }),
    file_type: varchar('file_type', { length: 255 }),
    creator_id: varchar('creator_id', { length: 255 }).notNull(),
    category_id: bigint('category_id', { mode: 'bigint', unsigned: true }),
    country_id: bigint('country_id', {
      mode: 'bigint',
      unsigned: true,
    }).references(() => country.id, { onDelete: 'cascade' }),
    city_id: bigint('city_id', { mode: 'bigint', unsigned: true }).references(
      () => city.id,
      { onDelete: 'cascade' },
    ),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    modified_at: timestamp('modified_at', { mode: 'string' })
      .defaultNow()
      .onUpdateNow(),
  },
  (table) => ({
    category_idIdx: index('category_id_idx').on(table.category_id),
    creator_id: index('creator_id_idx').on(table.creator_id),
    country_idIdx: index('country_id_idx').on(table.country_id),
    city_idIdx: index('city_id_idx').on(table.city_id),
    titleIdx: index('event_title_idx').on(table.title), // For title search
    startIdx: index('event_start_idx').on(table.start), // For date range queries
    endIdx: index('event_end_idx').on(table.end), // For date range queries
    entryTypeIdx: index('event_entry_type_idx').on(table.entry_type), // For entry type filtering
    createdAtIndex: index('event_created_at_idx').on(table.created_at), // For ordering
    // Composite indexes for common query patterns
    countryCityIdx: index('event_country_city_idx').on(
      table.country_id,
      table.city_id,
    ),
    categoryEntryTypeIdx: index('event_category_entry_type_idx').on(
      table.category_id,
      table.entry_type,
    ),
  }),
)

export const category = mysqlTable('category', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 191 }),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  modified_at: timestamp('modified_at', { mode: 'string' })
    .defaultNow()
    .onUpdateNow(),
})

export const subCategory = mysqlTable('sub_category', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 191 }),
  category_id: bigint('category_id', {
    mode: 'bigint',
    unsigned: true,
  }).references(() => category.id),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  modified_at: timestamp('modified_at', { mode: 'string' })
    .defaultNow()
    .onUpdateNow(),
})

export const eventToSubCategory = mysqlTable(
  'event_to_sub_category',
  {
    id: serial('id').primaryKey(),
    event_id: bigint('event_id', { mode: 'bigint', unsigned: true }),
    sub_category_id: bigint('sub_category_id', {
      mode: 'bigint',
      unsigned: true,
    }),
  },
  (table) => ({
    eventIdIdx: index('esc_event_id_idx').on(table.event_id),
    subCategoryIdIdx: index('esc_sub_category_id_idx').on(
      table.sub_category_id,
    ),
    eventSubCategoryIdx: index('esc_event_sub_category_idx').on(
      table.event_id,
      table.sub_category_id,
    ),
  }),
)

export const country = mysqlTable(
  'country',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 191 }).notNull(),
    iso2: varchar('iso2', { length: 2 }),
    iso3: varchar('iso3', { length: 3 }),
    lat: double('lat'),
    lng: double('lng'),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    modified_at: timestamp('modified_at', { mode: 'string' })
      .defaultNow()
      .onUpdateNow(),
  },
  (table) => ({
    nameIdx: index('country_name_idx').on(table.name), // For search operations
    iso2Idx: index('country_iso2_idx').on(table.iso2), // For ISO code lookups
  }),
)

export const city = mysqlTable(
  'city',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 191 }).notNull(),
    country_id: bigint('country_id', { mode: 'bigint', unsigned: true })
      .notNull()
      .references(() => country.id, { onDelete: 'cascade' }),
    lat: double('lat'),
    lng: double('lng'),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    modified_at: timestamp('modified_at', { mode: 'string' })
      .defaultNow()
      .onUpdateNow(),
  },
  (table) => ({
    nameIdx: index('city_name_idx').on(table.name), // For search operations
    countryIdIdx: index('city_country_id_idx').on(table.country_id), // For country lookups
    nameCountryIdx: index('city_name_country_idx').on(
      table.name,
      table.country_id,
    ), // Composite index for search within country
  }),
)
