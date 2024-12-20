export const mockFairs = [
  {
    id: 1,
    name: 'TechExpo 2024',
    description: 'Leading Technology Innovation Summit',
    venue: 'Berlin Exhibition Center',
    status: 'upcoming',
    venue_id: 1,
    organiser_id: 1,
    access_type: 'b2b',
    dogs_allowed: false,
    handicapped_accessible: true,
  },
  {
    id: 2,
    name: 'Food & Beverage Fair',
    description: 'International Culinary Exhibition',
    venue: 'Hamburg Messe',
    status: 'ongoing',
    venue_id: 2,
    organiser_id: 2,
    access_type: 'b2c',
    dogs_allowed: false,
    handicapped_accessible: true,
  },
  {
    id: 3,
    name: 'EcoLiving Expo',
    description: 'Sustainable Lifestyle Show',
    venue: 'Munich Conference Center',
    status: 'completed',
    venue_id: 3,
    organiser_id: 3,
    access_type: 'b2c',
    dogs_allowed: true,
    handicapped_accessible: true,
  },
];

export const mockOrganisers = [
  {
    id: 1,
    name: 'Event Solutions GmbH',
    email: 'contact@eventsolutions.de',
    phone: '+49 30 1234567',
    address: 'Hauptstraße 1',
    city: 'Berlin',
  },
  {
    id: 2,
    name: 'Fair Management AG',
    email: 'info@fairmanagement.de',
    phone: '+49 40 2345678',
    address: 'Messestraße 10',
    city: 'Hamburg',
  },
  {
    id: 3,
    name: 'Green Events Munich',
    email: 'kontakt@greenevents.de',
    phone: '+49 89 3456789',
    address: 'Ökostraße 15',
    city: 'Munich',
  },
];

export const mockVenues = [
  {
    id: 1,
    name: 'Berlin Exhibition Center',
    address: 'Messedamm 22',
    city: 'Berlin',
    capacity: 25000,
  },
  {
    id: 2,
    name: 'Hamburg Messe',
    address: 'Messestraße 1',
    city: 'Hamburg',
    capacity: 35000,
  },
  {
    id: 3,
    name: 'Munich Conference Center',
    address: 'Konferenzplatz 5',
    city: 'Munich',
    capacity: 15000,
  },
  {
    id: 4,
    name: 'Messe Frankfurt',
    address: 'Ludwig-Erhard-Anlage 1',
    city: 'Frankfurt',
    capacity: 40000,
  },
  {
    id: 5,
    name: 'Düsseldorf Messezentrum',
    address: 'Stockumer Kirchstraße 61',
    city: 'Düsseldorf',
    capacity: 30000,
  },
  {
    id: 6,
    name: 'Stuttgart Exhibition Grounds',
    address: 'Messepiazza 1',
    city: 'Stuttgart',
    capacity: 28000,
  },
  {
    id: 7,
    name: 'Hannover Exhibition Center',
    address: 'Messegelände',
    city: 'Hannover',
    capacity: 45000,
  },
  {
    id: 8,
    name: 'Leipzig Trade Fair',
    address: 'Messe-Allee 1',
    city: 'Leipzig',
    capacity: 20000,
  },
  {
    id: 9,
    name: 'NürnbergMesse',
    address: 'Messezentrum 1',
    city: 'Nürnberg',
    capacity: 32000,
  },
  {
    id: 10,
    name: 'Dresden Exhibition Hall',
    address: 'Messering 6',
    city: 'Dresden',
    capacity: 18000,
  },
  {
    id: 11,
    name: 'Koelnmesse',
    address: 'Messeplatz 1',
    city: 'Köln',
    capacity: 38000,
  },
  {
    id: 12,
    name: 'Bremen Exhibition Center',
    address: 'Findorffstraße 101',
    city: 'Bremen',
    capacity: 15000,
  },
  {
    id: 13,
    name: 'Messe Essen',
    address: 'Messeplatz 1',
    city: 'Essen',
    capacity: 22000,
  },
  {
    id: 14,
    name: 'Westfalenhallen Dortmund',
    address: 'Rheinlanddamm 200',
    city: 'Dortmund',
    capacity: 25000,
  },
  {
    id: 15,
    name: 'Maimarkt Mannheim',
    address: 'Xaver-Fuhr-Straße 101',
    city: 'Mannheim',
    capacity: 20000,
  },
  {
    id: 16,
    name: 'World Conference Center',
    address: 'Platz der Vereinten Nationen 2',
    city: 'Bonn',
    capacity: 12000,
  },
  {
    id: 17,
    name: 'Messe Karlsruhe',
    address: 'Messeallee 1',
    city: 'Karlsruhe',
    capacity: 18000,
  },
  {
    id: 18,
    name: 'Halle Münsterland',
    address: 'Albersloher Weg 32',
    city: 'Münster',
    capacity: 15000,
  },
  {
    id: 19,
    name: 'Augsburg Messezentrum',
    address: 'Am Messezentrum 5',
    city: 'Augsburg',
    capacity: 16000,
  },
  {
    id: 20,
    name: 'RheinMain CongressCenter',
    address: 'Friedrich-Ebert-Allee 1',
    city: 'Wiesbaden',
    capacity: 13000,
  },
  {
    id: 21,
    name: 'Eurogress Aachen',
    address: 'Monheimsallee 48',
    city: 'Aachen',
    capacity: 10000,
  },
  {
    id: 22,
    name: 'RuhrCongress',
    address: 'Stadionring 20',
    city: 'Bochum',
    capacity: 12000,
  },
  {
    id: 23,
    name: 'Messe Freiburg',
    address: 'Neuer Messplatz 1',
    city: 'Freiburg',
    capacity: 14000,
  },
  {
    id: 24,
    name: 'Rheingoldhalle',
    address: 'Rheinstraße 66',
    city: 'Mainz',
    capacity: 11000,
  },
  {
    id: 25,
    name: 'Sparkassen-Arena-Kiel',
    address: 'Europaplatz 1',
    city: 'Kiel',
    capacity: 13500,
  },
  {
    id: 26,
    name: 'Messe Erfurt',
    address: 'Gothaer Straße 34',
    city: 'Erfurt',
    capacity: 17000,
  },
  {
    id: 27,
    name: 'HanseMesse Rostock',
    address: 'Zur Hansemesse 1',
    city: 'Rostock',
    capacity: 15000,
  },
  {
    id: 28,
    name: 'GETEC Arena',
    address: 'Berliner Chaussee 32',
    city: 'Magdeburg',
    capacity: 12000,
  },
  {
    id: 29,
    name: 'Kongress Palais Kassel',
    address: 'Holger-Börner-Platz 1',
    city: 'Kassel',
    capacity: 11000,
  },
  {
    id: 30,
    name: 'Musik- und Kongresshalle Lübeck',
    address: 'Willy-Brandt-Allee 10',
    city: 'Lübeck',
    capacity: 10000,
  },
];
