const automotiveTypes = [
  { category: "automotive", typeKey: "car_dealer" },
  { category: "automotive", typeKey: "car_rental" },
  { category: "automotive", typeKey: "car_repair" },
  { category: "automotive", typeKey: "car_wash" },
  { category: "automotive", typeKey: "gas_station" },
  { category: "automotive", typeKey: "insurance_agency" },
  { category: "automotive", typeKey: "parking" },
] as const;

const businessTypes = [
  { category: "business", typeKey: "accounting" },
  { category: "business", typeKey: "book_store" },
  { category: "business", typeKey: "real_estate_agency" },
  { category: "business", typeKey: "travel_agency" },
] as const;

const cultureTypes = [
  { category: "culture", typeKey: "art_gallery" },
  { category: "culture", typeKey: "library" },
  { category: "culture", typeKey: "museum" },
] as const;

const educationTypes = [
  { category: "education", typeKey: "school" },
  { category: "education", typeKey: "university" },
] as const;

const entertainmentAndRecreationTypes = [
  { category: "entertainment_and_recreation", typeKey: "amusement_park" },
  { category: "entertainment_and_recreation", typeKey: "aquarium" },
  { category: "entertainment_and_recreation", typeKey: "bowling_alley" },
  { category: "entertainment_and_recreation", typeKey: "casino" },
  { category: "entertainment_and_recreation", typeKey: "movie_theater" },
  { category: "entertainment_and_recreation", typeKey: "night_club" },
  { category: "entertainment_and_recreation", typeKey: "stadium" },
  { category: "entertainment_and_recreation", typeKey: "zoo" },
] as const;

const financeTypes = [
  { category: "finance", typeKey: "atm" },
  { category: "finance", typeKey: "bank" },
] as const;

const foodAndDrinkTypes = [
  { category: "food_and_drink", typeKey: "bakery" },
  { category: "food_and_drink", typeKey: "bar" },
  { category: "food_and_drink", typeKey: "cafe" },
  { category: "food_and_drink", typeKey: "restaurant" },
] as const;

const geographicalAreasTypes = [
  { category: "geographical_areas", typeKey: "country" },
  { category: "geographical_areas", typeKey: "locality" },
  { category: "geographical_areas", typeKey: "neighborhood" },
  { category: "geographical_areas", typeKey: "sublocality" },
] as const;

const governmentTypes = [
  { category: "government", typeKey: "city_hall" },
  { category: "government", typeKey: "courthouse" },
  { category: "government", typeKey: "embassy" },
  { category: "government", typeKey: "fire_station" },
  { category: "government", typeKey: "local_government_office" },
  { category: "government", typeKey: "police" },
  { category: "government", typeKey: "post_office" },
] as const;

const healthAndWellnessTypes = [
  { category: "health_and_wellness", typeKey: "dentist" },
  { category: "health_and_wellness", typeKey: "doctor" },
  { category: "health_and_wellness", typeKey: "gym" },
  { category: "health_and_wellness", typeKey: "hospital" },
  { category: "health_and_wellness", typeKey: "pharmacy" },
  { category: "health_and_wellness", typeKey: "physiotherapist" },
  { category: "health_and_wellness", typeKey: "spa" },
] as const;

const lodgingTypes = [
  { category: "lodging", typeKey: "campground" },
  { category: "lodging", typeKey: "lodging" },
  { category: "lodging", typeKey: "rv_park" },
] as const;

const placesOfWorshipTypes = [
  { category: "places_of_worship", typeKey: "church" },
  { category: "places_of_worship", typeKey: "hindu_temple" },
  { category: "places_of_worship", typeKey: "mosque" },
  { category: "places_of_worship", typeKey: "synagogue" },
] as const;

const servicesTypes = [
  { category: "services", typeKey: "beauty_salon" },
  { category: "services", typeKey: "electrician" },
  { category: "services", typeKey: "laundry" },
  { category: "services", typeKey: "locksmith" },
  { category: "services", typeKey: "moving_company" },
  { category: "services", typeKey: "painter" },
  { category: "services", typeKey: "plumber" },
  { category: "services", typeKey: "roofing_contractor" },
] as const;

const shoppingTypes = [
  { category: "shopping", typeKey: "bicycle_store" },
  { category: "shopping", typeKey: "clothing_store" },
  { category: "shopping", typeKey: "convenience_store" },
  { category: "shopping", typeKey: "department_store" },
  { category: "shopping", typeKey: "electronics_store" },
  { category: "shopping", typeKey: "furniture_store" },
  { category: "shopping", typeKey: "grocery_or_supermarket" },
  { category: "shopping", typeKey: "hardware_store" },
  { category: "shopping", typeKey: "home_goods_store" },
  { category: "shopping", typeKey: "jewelry_store" },
  { category: "shopping", typeKey: "liquor_store" },
  { category: "shopping", typeKey: "pet_store" },
  { category: "shopping", typeKey: "shoe_store" },
  { category: "shopping", typeKey: "shopping_mall" },
  { category: "shopping", typeKey: "store" },
] as const;

const sportsTypes = [
  { category: "sports", typeKey: "gym" },
  { category: "sports", typeKey: "stadium" },
] as const;

const transportationTypes = [
  { category: "transportation", typeKey: "airport" },
  { category: "transportation", typeKey: "bus_station" },
  { category: "transportation", typeKey: "subway_station" },
  { category: "transportation", typeKey: "taxi_stand" },
  { category: "transportation", typeKey: "train_station" },
  { category: "transportation", typeKey: "transit_station" },
] as const;

/**
 * - `places.types`, `places.primaryType`, `places.primaryTypeDisplayName` in response
 * - `includedTypes`, `excludedTypes`, `includedPrimaryTypes`, `excludedPrimaryTypes` in request
 * @see https://developers.google.com/maps/documentation/places/web-service/place-types
 */
export const placeTypes = [
  ...automotiveTypes,
  ...businessTypes,
  ...cultureTypes,
  ...educationTypes,
  ...entertainmentAndRecreationTypes,
  ...financeTypes,
  ...foodAndDrinkTypes,
  ...geographicalAreasTypes,
  ...governmentTypes,
  ...healthAndWellnessTypes,
  ...lodgingTypes,
  ...placesOfWorshipTypes,
  ...servicesTypes,
  ...shoppingTypes,
  ...sportsTypes,
  ...transportationTypes,
] as const;

export type PlaceTypeCategory = (typeof placeTypes)[number]["category"];
export type PlaceType = (typeof placeTypes)[number]["typeKey"];

export const placeTypeCategoryDisplayNames = {
  automotive: { displayName: "Automotive", emoji: "🚗" },
  business: { displayName: "Business", emoji: "💼" },
  culture: { displayName: "Culture", emoji: "🎨" },
  education: { displayName: "Education", emoji: "🎓" },
  entertainment_and_recreation: {
    displayName: "Entertainment and Recreation",
    emoji: "🎉",
  },
  finance: { displayName: "Finance", emoji: "💰" },
  food_and_drink: { displayName: "Food and Drink", emoji: "🍽️" },
  geographical_areas: { displayName: "Geographical Areas", emoji: "🌍" },
  government: { displayName: "Government", emoji: "🏛️" },
  health_and_wellness: { displayName: "Health and Wellness", emoji: "🏥" },
  lodging: { displayName: "Lodging", emoji: "🛏️" },
  places_of_worship: { displayName: "Places of Worship", emoji: "⛪" },
  services: { displayName: "Services", emoji: "🛠️" },
  shopping: { displayName: "Shopping", emoji: "🛒" },
  sports: { displayName: "Sports", emoji: "🏆" },
  transportation: { displayName: "Transportation", emoji: "🚉" },
} as const;

const popularCategories = [
  "food_and_drink",
  "shopping",
  "entertainment_and_recreation",
  "automotive",
  "lodging",
  "transportation",
  "health_and_wellness",
  "education",
  "government",
  "business",
  "services",
  "sports",
  "finance",
  "places_of_worship",
  "geographical_areas",
  "culture",
] as const;

export const popularPlaceTypes = popularCategories.map((category) => ({
  categoryKey: category,
  ...placeTypeCategoryDisplayNames[category],
}));

export function isPlaceTypeCategory(value: string): value is PlaceTypeCategory {
  return Object.keys(placeTypeCategoryDisplayNames).includes(value);
}
