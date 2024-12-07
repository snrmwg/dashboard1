import { foreignKey, integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const image = sqliteTable("image", {
  id: integer().primaryKey().notNull(),
  image_uri: text().notNull(),
  uploaded_at: integer({ mode: "timestamp" }).notNull(),
  content_type: text(),
  content_length: integer(),
  width: integer(),
  height: integer(),
  author: text(),
  copyright: text(),
});

export const list_ad = sqliteTable("list_ad", {
  id: integer().primaryKey().notNull(),
  headline: text().notNull(),
  content: text().notNull(),
  advertiser_url: text().notNull(),
  image_id: integer().notNull().references(() => image.id),
  link_text: text(),
  link_text_url: text(),
});

export const city = sqliteTable("city", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  region: text().notNull(),
  isocode: text().notNull(),
  hotel_de_location: integer(),
  topcity: integer({ mode: "boolean" }),
  list_ad_id1: integer().references(() => list_ad.id, { onDelete: "set null" }),
  list_ad_id2: integer().references(() => list_ad.id, { onDelete: "set null" }),
});

export const contact_info = sqliteTable("contact_info", {
  id: integer().primaryKey().notNull(),
  street: text(),
  zip: text(),
  city: text(),
  city_id: integer().references(() => city.id),
  address_city_id: integer().references(() => city.id),
  phone: text(),
  fax: text(),
  email: text(),
  website: text(),
  latitude: real(),
  longitude: real(),
  plus_code: text(),
  osm_id: integer(),
});

export const organiser = sqliteTable("organiser", {
    id: integer().primaryKey().notNull(),
    name: text().notNull(),
    city_id: integer().notNull().references(() => city.id),
    association_id: integer().references(() => association.id, { onDelete: "set null" }),
    contact_info_id: integer().references(() => contact_info.id),
    partnergroup_id: integer(),
    booth_request_blocked: integer({ mode: "boolean" }),
    booth_request_email: text(),
    visitor_request_blocked: integer({ mode: "boolean" }),
    visitor_request_email: text(),
    fully_blocked: integer({ mode: "boolean" }),
    logo_blocked: integer({ mode: "boolean" }),
    redirect_organiser_id: integer(),
    premium: integer(),
    premium_dont_call: integer({ mode: "boolean" }),
    premium_chance: integer(),
    premium_in_clarification: integer({ mode: "boolean" }),
    premium_requests_test_phase: integer({ mode: "boolean" }),
    premium_requests_basic_mode: integer(),
    requests_email: text(),
    requests_email_blocked: integer({ mode: "boolean" }),
    requests_phone: text(),
    requests_phone_blocked: integer({ mode: "boolean" }),
    feature_visitor_request: integer({ mode: "boolean" }),
    feature_booth_request: integer({ mode: "boolean" }),
    feature_ticketshop: integer({ mode: "boolean" }),
    feature_show_contact: integer({ mode: "boolean" }),
    feature_fairlink: integer({ mode: "boolean" }),
    feature_search_booster: integer({ mode: "boolean" }),
    ticketshop_url: text(),
    contact_logo_image_id: integer().references(() => image.id),
    contact_url: text(),
    search_booster: text(),
    note: text(),
  },
  (table) => {
    return {
      organiser_redirect_organiser_id_organiser_id_fk: foreignKey({
        columns: [table.redirect_organiser_id],
        foreignColumns: [table.id],
      }),
    };
  });

export const venue = sqliteTable("venue", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  city_id: integer().notNull().references(() => city.id),
  contact_info_id: integer().references(() => contact_info.id),
  search_booster: text(),
});

export const fair = sqliteTable("fair", {
    id: integer().primaryKey().notNull(),
    name: text().notNull(),
    organiser_id: integer().notNull().references(() => organiser.id),
    venue_id: integer().references(() => venue.id),
    venue_city_id: integer().references(() => city.id),
    redirect_fair_id: integer(),
    description: text(),
    subtitle: text(),
    topics: text(),
    logo_image_id: integer().references(() => image.id),
    online: integer(),
    website: text(),
    enquiry_website: text(),
    meta_title: text(),
    meta_keywords: text(),
    ads_keyword: text(),
    search_booster: text(),
    topfair: integer({ mode: "boolean" }),
    blocked: integer({ mode: "boolean" }),
    access_type: text({ enum: ["b2b", "b2c"] }),
    dogs_allowed: integer({ mode: "boolean" }),
    handicapped_accessible: integer({ mode: "boolean" }),
    ticketshop_url: text(),
    youtube_id: text(),
    requests_contactperson: text(),
    requests_email: text(),
    requests_email_blocked: integer({ mode: "boolean" }),
    requests_phone: text(),
    requests_phone_blocked: integer({ mode: "boolean" }),
    booth_request_blocked: integer({ mode: "boolean" }),
    booth_request_email: text(),
    visitor_request_blocked: integer({ mode: "boolean" }),
    visitor_request_email: text(),
    cycle_months: integer(),
    founding_year: integer(),
    visitors_count: integer(),
    exhibitors_count: integer(),
    exhibition_area: integer(),
    exhibition_halls_count: integer(),
    note: text(),
  },
  (table) => {
    return {
      fair_redirect_fair_id_fair_id_fk: foreignKey({
        columns: [table.redirect_fair_id],
        foreignColumns: [table.id],
        name: "fair_redirect_fair_id_fair_id_fk",
      }),
    };
  });

export const fair_category = sqliteTable("fair_category", {
    fair_id: integer().notNull().references(() => fair.id, { onDelete: "cascade" }),
    category_id: integer().notNull().references(() => category.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk0: primaryKey({ columns: [table.fair_id, table.category_id], name: "fair_category_fair_id_category_id_pk" }),
    };
  });

export const fair_image = sqliteTable("fair_image", {
    fair_id: integer().notNull().references(() => fair.id, { onDelete: "cascade" }),
    image_id: integer().references(() => image.id, { onDelete: "cascade" }),
    ordering: integer().notNull(),
  },
  (table) => {
    return {
      pk0: primaryKey({ columns: [table.fair_id, table.image_id], name: "fair_image_fair_id_image_id_pk" }),
    };
  });

export const fair_date = sqliteTable("fair_date", {
  id: integer().primaryKey().notNull(),
  fair_id: integer().notNull().references(() => fair.id, { onDelete: "cascade" }),
  start_date: text().notNull(),
  end_date: text().notNull(),
  cancelled: integer({ mode: "boolean" }),
  openinghours_json: text({ mode: "json" }),
  admissions_json: text({ mode: "json" }),
  legacy_openinghours: text(),
  legacy_admissions: text(),
});

export const fair_news = sqliteTable("fair_news", {
  id: integer().primaryKey().notNull(),
  fair_id: integer().notNull().references(() => fair.id, { onDelete: "cascade" }),
  publish_date: text().notNull(),
  headline: text().notNull(),
  content: text().notNull(),
  outline: text(),
  tags: text(),
});

export const competition = sqliteTable("competition", {
  id: integer().primaryKey().notNull(),
  fair_id: integer().notNull().references(() => fair.id, { onDelete: "cascade" }),
  start_date: text().notNull(),
  end_date: text().notNull(),
  stopped: integer({ mode: "boolean" }),
  count_winners: integer().notNull(),
  question: text().notNull(),
  correct_answer: text().notNull(),
  wrong_answer_1: text().notNull(),
  wrong_answer_2: text().notNull(),
  solution_url: text(),
  sponsor_url: text(),
  sponsor_name: text(),
  sponsor_image_id: integer().references(() => image.id),
});

export const association = sqliteTable("association", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  description: text(),
  contact_info_id: integer().references(() => contact_info.id),
});

export const category = sqliteTable("category", {
  id: integer().primaryKey().notNull(),
  name: text().notNull(),
  description: text(),
  keywords: text(),
});

