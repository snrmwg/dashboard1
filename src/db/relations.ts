import { relations } from "drizzle-orm/relations";
import {
  association,
  category,
  city,
  competition,
  contact_info,
  fair,
  fair_category,
  fair_date,
  fair_image,
  fair_news,
  image,
  list_ad,
  organiser,
  venue,
} from "./schema";

export const list_adRelations = relations(list_ad, ({ one, many }) => ({
  image: one(image, {
    fields: [list_ad.image_id],
    references: [image.id],
  }),
  cities_list_ad_id2: many(city, {
    relationName: "city_list_ad_id2_list_ad_id",
  }),
  cities_list_ad_id1: many(city, {
    relationName: "city_list_ad_id1_list_ad_id",
  }),
}));

export const imageRelations = relations(image, ({ many }) => ({
  list_ads: many(list_ad),
  organisers: many(organiser),
  fairs: many(fair),
  fair_images: many(fair_image),
  competitions: many(competition),
}));

export const cityRelations = relations(city, ({ one, many }) => ({
  list_ad_list_ad_id2: one(list_ad, {
    fields: [city.list_ad_id2],
    references: [list_ad.id],
    relationName: "city_list_ad_id2_list_ad_id",
  }),
  list_ad_list_ad_id1: one(list_ad, {
    fields: [city.list_ad_id1],
    references: [list_ad.id],
    relationName: "city_list_ad_id1_list_ad_id",
  }),
  contact_infos_address_city_id: many(contact_info, {
    relationName: "contact_info_address_city_id_city_id",
  }),
  contact_infos_city_id: many(contact_info, {
    relationName: "contact_info_city_id_city_id",
  }),
  organisers: many(organiser),
  venues: many(venue),
  fairs: many(fair),
}));

export const contact_infoRelations = relations(contact_info, ({ one, many }) => ({
  city_address_city_id: one(city, {
    fields: [contact_info.address_city_id],
    references: [city.id],
    relationName: "contact_info_address_city_id_city_id",
  }),
  city_city_id: one(city, {
    fields: [contact_info.city_id],
    references: [city.id],
    relationName: "contact_info_city_id_city_id",
  }),
  organisers: many(organiser),
  venues: many(venue),
  associations: many(association),
}));

export const organiserRelations = relations(organiser, ({ one, many }) => ({
  image: one(image, {
    fields: [organiser.contact_logo_image_id],
    references: [image.id],
  }),
  organiser: one(organiser, {
    fields: [organiser.redirect_organiser_id],
    references: [organiser.id],
    relationName: "organiser_redirect_organiser_id_organiser_id",
  }),
  organisers: many(organiser, {
    relationName: "organiser_redirect_organiser_id_organiser_id",
  }),
  contact_info: one(contact_info, {
    fields: [organiser.contact_info_id],
    references: [contact_info.id],
  }),
  association: one(association, {
    fields: [organiser.association_id],
    references: [association.id],
  }),
  city: one(city, {
    fields: [organiser.city_id],
    references: [city.id],
  }),
  fairs: many(fair),
}));

export const associationRelations = relations(association, ({ one, many }) => ({
  organisers: many(organiser),
  contact_info: one(contact_info, {
    fields: [association.contact_info_id],
    references: [contact_info.id],
  }),
}));

export const venueRelations = relations(venue, ({ one, many }) => ({
  contact_info: one(contact_info, {
    fields: [venue.contact_info_id],
    references: [contact_info.id],
  }),
  city: one(city, {
    fields: [venue.city_id],
    references: [city.id],
  }),
  fairs: many(fair),
}));

export const fairRelations = relations(fair, ({ one, many }) => ({
  image: one(image, {
    fields: [fair.logo_image_id],
    references: [image.id],
  }),
  fair: one(fair, {
    fields: [fair.redirect_fair_id],
    references: [fair.id],
    relationName: "fair_redirect_fair_id_fair_id",
  }),
  fairs: many(fair, {
    relationName: "fair_redirect_fair_id_fair_id",
  }),
  city: one(city, {
    fields: [fair.venue_city_id],
    references: [city.id],
  }),
  venue: one(venue, {
    fields: [fair.venue_id],
    references: [venue.id],
  }),
  organiser: one(organiser, {
    fields: [fair.organiser_id],
    references: [organiser.id],
  }),
  fair_categories: many(fair_category),
  fair_images: many(fair_image),
  fair_dates: many(fair_date),
  fair_news: many(fair_news),
  competitions: many(competition),
}));

export const fair_categoryRelations = relations(fair_category, ({ one }) => ({
  category: one(category, {
    fields: [fair_category.category_id],
    references: [category.id],
  }),
  fair: one(fair, {
    fields: [fair_category.fair_id],
    references: [fair.id],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  fair_categories: many(fair_category),
}));

export const fair_imageRelations = relations(fair_image, ({ one }) => ({
  image: one(image, {
    fields: [fair_image.image_id],
    references: [image.id],
  }),
  fair: one(fair, {
    fields: [fair_image.fair_id],
    references: [fair.id],
  }),
}));

export const fair_dateRelations = relations(fair_date, ({ one }) => ({
  fair: one(fair, {
    fields: [fair_date.fair_id],
    references: [fair.id],
  }),
}));

export const fair_newsRelations = relations(fair_news, ({ one }) => ({
  fair: one(fair, {
    fields: [fair_news.fair_id],
    references: [fair.id],
  }),
}));

export const competitionRelations = relations(competition, ({ one }) => ({
  image: one(image, {
    fields: [competition.sponsor_image_id],
    references: [image.id],
  }),
  fair: one(fair, {
    fields: [competition.fair_id],
    references: [fair.id],
  }),
}));
