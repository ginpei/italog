const automotiveTypes = [
  { category: "automotive", typeKey: "car_dealer" },
  { category: "automotive", typeKey: "car_rental" },
  { category: "automotive", typeKey: "car_repair" },
  { category: "automotive", typeKey: "car_wash" },
  { category: "automotive", typeKey: "electric_vehicle_charging_station" },
  { category: "automotive", typeKey: "gas_station" },
  { category: "automotive", typeKey: "parking" },
  { category: "automotive", typeKey: "rest_stop" },
] as const;

const businessTypes = [{ category: "business", typeKey: "farm" }] as const;

const cultureTypes = [
  { category: "culture", typeKey: "art_gallery" },
  { category: "culture", typeKey: "museum" },
  { category: "culture", typeKey: "performing_arts_theater" },
] as const;

const educationTypes = [
  { category: "education", typeKey: "library" },
  { category: "education", typeKey: "preschool" },
  { category: "education", typeKey: "primary_school" },
  { category: "education", typeKey: "school" },
  { category: "education", typeKey: "secondary_school" },
  { category: "education", typeKey: "university" },
] as const;

const entertainmentAndRecreationTypes = [
  { category: "entertainment_and_recreation", typeKey: "amusement_center" },
  { category: "entertainment_and_recreation", typeKey: "amusement_park" },
  { category: "entertainment_and_recreation", typeKey: "aquarium" },
  { category: "entertainment_and_recreation", typeKey: "banquet_hall" },
  { category: "entertainment_and_recreation", typeKey: "bowling_alley" },
  { category: "entertainment_and_recreation", typeKey: "casino" },
  { category: "entertainment_and_recreation", typeKey: "community_center" },
  { category: "entertainment_and_recreation", typeKey: "convention_center" },
  { category: "entertainment_and_recreation", typeKey: "cultural_center" },
  { category: "entertainment_and_recreation", typeKey: "dog_park" },
  { category: "entertainment_and_recreation", typeKey: "event_venue" },
  { category: "entertainment_and_recreation", typeKey: "hiking_area" },
  { category: "entertainment_and_recreation", typeKey: "historical_landmark" },
  { category: "entertainment_and_recreation", typeKey: "marina" },
  { category: "entertainment_and_recreation", typeKey: "movie_rental" },
  { category: "entertainment_and_recreation", typeKey: "movie_theater" },
  { category: "entertainment_and_recreation", typeKey: "national_park" },
  { category: "entertainment_and_recreation", typeKey: "night_club" },
  { category: "entertainment_and_recreation", typeKey: "park" },
  { category: "entertainment_and_recreation", typeKey: "tourist_attraction" },
  { category: "entertainment_and_recreation", typeKey: "visitor_center" },
  { category: "entertainment_and_recreation", typeKey: "wedding_venue" },
  { category: "entertainment_and_recreation", typeKey: "zoo" },
] as const;

const financeTypes = [
  { category: "finance", typeKey: "accounting" },
  { category: "finance", typeKey: "atm" },
  { category: "finance", typeKey: "bank" },
] as const;

const foodAndDrinkTypes = [
  { category: "food_and_drink", typeKey: "american_restaurant" },
  { category: "food_and_drink", typeKey: "bakery" },
  { category: "food_and_drink", typeKey: "bar" },
  { category: "food_and_drink", typeKey: "barbecue_restaurant" },
  { category: "food_and_drink", typeKey: "brazilian_restaurant" },
  { category: "food_and_drink", typeKey: "breakfast_restaurant" },
  { category: "food_and_drink", typeKey: "brunch_restaurant" },
  { category: "food_and_drink", typeKey: "cafe" },
  { category: "food_and_drink", typeKey: "chinese_restaurant" },
  { category: "food_and_drink", typeKey: "coffee_shop" },
  { category: "food_and_drink", typeKey: "fast_food_restaurant" },
  { category: "food_and_drink", typeKey: "french_restaurant" },
  { category: "food_and_drink", typeKey: "greek_restaurant" },
  { category: "food_and_drink", typeKey: "hamburger_restaurant" },
  { category: "food_and_drink", typeKey: "ice_cream_shop" },
  { category: "food_and_drink", typeKey: "indian_restaurant" },
  { category: "food_and_drink", typeKey: "indonesian_restaurant" },
  { category: "food_and_drink", typeKey: "italian_restaurant" },
  { category: "food_and_drink", typeKey: "japanese_restaurant" },
  { category: "food_and_drink", typeKey: "korean_restaurant" },
  { category: "food_and_drink", typeKey: "lebanese_restaurant" },
  { category: "food_and_drink", typeKey: "meal_delivery" },
  { category: "food_and_drink", typeKey: "meal_takeaway" },
  { category: "food_and_drink", typeKey: "mediterranean_restaurant" },
  { category: "food_and_drink", typeKey: "mexican_restaurant" },
  { category: "food_and_drink", typeKey: "middle_eastern_restaurant" },
  { category: "food_and_drink", typeKey: "pizza_restaurant" },
  { category: "food_and_drink", typeKey: "ramen_restaurant" },
  { category: "food_and_drink", typeKey: "restaurant" },
  { category: "food_and_drink", typeKey: "sandwich_shop" },
  { category: "food_and_drink", typeKey: "seafood_restaurant" },
  { category: "food_and_drink", typeKey: "spanish_restaurant" },
  { category: "food_and_drink", typeKey: "steak_house" },
  { category: "food_and_drink", typeKey: "sushi_restaurant" },
  { category: "food_and_drink", typeKey: "thai_restaurant" },
  { category: "food_and_drink", typeKey: "turkish_restaurant" },
  { category: "food_and_drink", typeKey: "vegan_restaurant" },
  { category: "food_and_drink", typeKey: "vegetarian_restaurant" },
  { category: "food_and_drink", typeKey: "vietnamese_restaurant" },
] as const;

const geographicalAreasTypes = [
  { category: "geographical_areas", typeKey: "administrative_area_level_1" },
  { category: "geographical_areas", typeKey: "administrative_area_level_2" },
  { category: "geographical_areas", typeKey: "country" },
  { category: "geographical_areas", typeKey: "locality" },
  { category: "geographical_areas", typeKey: "postal_code" },
  { category: "geographical_areas", typeKey: "school_district" },
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
  { category: "health_and_wellness", typeKey: "dental_clinic" },
  { category: "health_and_wellness", typeKey: "dentist" },
  { category: "health_and_wellness", typeKey: "doctor" },
  { category: "health_and_wellness", typeKey: "drugstore" },
  { category: "health_and_wellness", typeKey: "hospital" },
  { category: "health_and_wellness", typeKey: "medical_lab" },
  { category: "health_and_wellness", typeKey: "pharmacy" },
  { category: "health_and_wellness", typeKey: "physiotherapist" },
  { category: "health_and_wellness", typeKey: "spa" },
] as const;

const lodgingTypes = [
  { category: "lodging", typeKey: "bed_and_breakfast" },
  { category: "lodging", typeKey: "campground" },
  { category: "lodging", typeKey: "camping_cabin" },
  { category: "lodging", typeKey: "cottage" },
  { category: "lodging", typeKey: "extended_stay_hotel" },
  { category: "lodging", typeKey: "farmstay" },
  { category: "lodging", typeKey: "guest_house" },
  { category: "lodging", typeKey: "hostel" },
  { category: "lodging", typeKey: "hotel" },
  { category: "lodging", typeKey: "lodging" },
  { category: "lodging", typeKey: "motel" },
  { category: "lodging", typeKey: "private_guest_room" },
  { category: "lodging", typeKey: "resort_hotel" },
  { category: "lodging", typeKey: "rv_park" },
] as const;

const placesOfWorshipTypes = [
  { category: "places_of_worship", typeKey: "church" },
  { category: "places_of_worship", typeKey: "hindu_temple" },
  { category: "places_of_worship", typeKey: "mosque" },
  { category: "places_of_worship", typeKey: "synagogue" },
] as const;

const servicesTypes = [
  { category: "services", typeKey: "barber_shop" },
  { category: "services", typeKey: "beauty_salon" },
  { category: "services", typeKey: "cemetery" },
  { category: "services", typeKey: "child_care_agency" },
  { category: "services", typeKey: "consultant" },
  { category: "services", typeKey: "courier_service" },
  { category: "services", typeKey: "electrician" },
  { category: "services", typeKey: "florist" },
  { category: "services", typeKey: "funeral_home" },
  { category: "services", typeKey: "hair_care" },
  { category: "services", typeKey: "hair_salon" },
  { category: "services", typeKey: "insurance_agency" },
  { category: "services", typeKey: "laundry" },
  { category: "services", typeKey: "lawyer" },
  { category: "services", typeKey: "locksmith" },
  { category: "services", typeKey: "moving_company" },
  { category: "services", typeKey: "painter" },
  { category: "services", typeKey: "plumber" },
  { category: "services", typeKey: "real_estate_agency" },
  { category: "services", typeKey: "roofing_contractor" },
  { category: "services", typeKey: "storage" },
  { category: "services", typeKey: "tailor" },
  { category: "services", typeKey: "telecommunications_service_provider" },
  { category: "services", typeKey: "travel_agency" },
  { category: "services", typeKey: "veterinary_care" },
] as const;

const shoppingTypes = [
  { category: "shopping", typeKey: "auto_parts_store" },
  { category: "shopping", typeKey: "bicycle_store" },
  { category: "shopping", typeKey: "book_store" },
  { category: "shopping", typeKey: "cell_phone_store" },
  { category: "shopping", typeKey: "clothing_store" },
  { category: "shopping", typeKey: "convenience_store" },
  { category: "shopping", typeKey: "department_store" },
  { category: "shopping", typeKey: "discount_store" },
  { category: "shopping", typeKey: "electronics_store" },
  { category: "shopping", typeKey: "furniture_store" },
  { category: "shopping", typeKey: "gift_shop" },
  { category: "shopping", typeKey: "grocery_store" },
  { category: "shopping", typeKey: "hardware_store" },
  { category: "shopping", typeKey: "home_goods_store" },
  { category: "shopping", typeKey: "home_improvement_store" },
  { category: "shopping", typeKey: "jewelry_store" },
  { category: "shopping", typeKey: "liquor_store" },
  { category: "shopping", typeKey: "market" },
  { category: "shopping", typeKey: "pet_store" },
  { category: "shopping", typeKey: "shoe_store" },
  { category: "shopping", typeKey: "shopping_mall" },
  { category: "shopping", typeKey: "sporting_goods_store" },
  { category: "shopping", typeKey: "store" },
  { category: "shopping", typeKey: "supermarket" },
  { category: "shopping", typeKey: "wholesaler" },
] as const;

const sportsTypes = [
  { category: "sports", typeKey: "athletic_field" },
  { category: "sports", typeKey: "fitness_center" },
  { category: "sports", typeKey: "golf_course" },
  { category: "sports", typeKey: "gym" },
  { category: "sports", typeKey: "playground" },
  { category: "sports", typeKey: "ski_resort" },
  { category: "sports", typeKey: "sports_club" },
  { category: "sports", typeKey: "sports_complex" },
  { category: "sports", typeKey: "stadium" },
  { category: "sports", typeKey: "swimming_pool" },
] as const;

const transportationTypes = [
  { category: "transportation", typeKey: "airport" },
  { category: "transportation", typeKey: "bus_station" },
  { category: "transportation", typeKey: "bus_stop" },
  { category: "transportation", typeKey: "ferry_terminal" },
  { category: "transportation", typeKey: "heliport" },
  { category: "transportation", typeKey: "light_rail_station" },
  { category: "transportation", typeKey: "park_and_ride" },
  { category: "transportation", typeKey: "subway_station" },
  { category: "transportation", typeKey: "taxi_stand" },
  { category: "transportation", typeKey: "train_station" },
  { category: "transportation", typeKey: "transit_depot" },
  { category: "transportation", typeKey: "transit_station" },
  { category: "transportation", typeKey: "truck_stop" },
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
