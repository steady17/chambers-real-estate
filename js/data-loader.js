/**
 * CHAMBERS — live data loader
 * -----------------------------------------------------------------
 * Fetches properties and developments from Supabase and fills them
 * into the PROPERTIES / DEVELOPMENTS arrays already declared in
 * data.js, so every existing render function keeps working exactly
 * as before — it just now shows real, live data instead of the
 * built-in demo listings.
 *
 * If Supabase can't be reached (no internet, database down, etc.)
 * the page quietly keeps showing the built-in demo listings instead
 * of breaking, so the site is never left empty.
 * -----------------------------------------------------------------
 */
function mapDbProperty(row){
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    price: row.price,
    priceSub: row.price_sub,
    purpose: row.purpose,
    type: row.type,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    toilets: row.toilets,
    parking: row.parking,
    size: row.size,
    condition: row.condition,
    titleDoc: row.title_doc,
    availability: row.availability,
    negotiable: row.negotiable,
    featured: row.featured,
    image: row.image,
    gallery: row.gallery || [],
    description: row.description,
    features: row.features || [],
  };
}
function mapDbDevelopment(row){
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    status: row.status,
    image: row.image,
    gallery: row.gallery || [],
    summary: row.summary,
    description: row.description,
    features: row.features || [],
  };
}

async function loadChambersData(){
  try{
    const [propRes, devRes] = await Promise.all([
      chambersDB.from("properties").select("*").order("created_at", { ascending:false }),
      chambersDB.from("developments").select("*").order("created_at", { ascending:false }),
    ]);
    if(!propRes.error && propRes.data && propRes.data.length){
      PROPERTIES.length = 0;
      propRes.data.forEach(row => PROPERTIES.push(mapDbProperty(row)));
    }
    if(!devRes.error && devRes.data && devRes.data.length){
      DEVELOPMENTS.length = 0;
      devRes.data.forEach(row => DEVELOPMENTS.push(mapDbDevelopment(row)));
    }
  }catch(err){
    console.warn("Chambers: could not reach live database, showing demo listings instead.", err);
  }
}
