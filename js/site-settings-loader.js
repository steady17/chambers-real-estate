/**
 * CHAMBERS — live site settings loader
 * -----------------------------------------------------------------
 * Fetches business details (phone, WhatsApp, address, Instagram)
 * from Supabase and updates the CHAMBERS_CONFIG object already set
 * up by config.js, so every page shows whatever was last saved from
 * the admin dashboard's Settings page instead of the fixed defaults.
 *
 * If Supabase can't be reached, the page quietly keeps the defaults
 * from config.js, so the site is never left blank.
 * -----------------------------------------------------------------
 */
async function loadSiteSettings(){
  try{
    const { data, error } = await chambersDB.from("site_settings").select("*").eq("id", "main").single();
    if(error || !data) return;
    if(data.phone_display){
      CHAMBERS_CONFIG.phoneDisplay = data.phone_display;
      CHAMBERS_CONFIG.phoneTel = "+" + data.phone_display.replace(/[^\d]/g, "");
    }
    if(data.whatsapp_number){
      CHAMBERS_CONFIG.whatsappNumber = data.whatsapp_number.replace(/[^\d]/g, "");
      CHAMBERS_CONFIG.whatsappDisplay = "+" + CHAMBERS_CONFIG.whatsappNumber;
    }
    if(data.office_address) CHAMBERS_CONFIG.officeAddress = data.office_address;
    if(data.instagram_handle){
      CHAMBERS_CONFIG.instagramHandle = data.instagram_handle;
      CHAMBERS_CONFIG.instagramUrl = "https://instagram.com/" + data.instagram_handle.replace("@", "");
    }
    if(data.email) CHAMBERS_CONFIG.email = data.email;
    if(data.hours_note) CHAMBERS_CONFIG.hoursNote = data.hours_note;
    if(data.x_handle){
      CHAMBERS_CONFIG.xHandle = data.x_handle;
      CHAMBERS_CONFIG.xUrl = "https://x.com/" + data.x_handle.replace("@", "");
    }
    if(data.facebook_name) CHAMBERS_CONFIG.facebookName = data.facebook_name;
  }catch(err){
    console.warn("Chambers: could not reach live settings, showing defaults instead.", err);
  }
}
