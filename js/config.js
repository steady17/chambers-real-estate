/**
 * CHAMBERS REAL ESTATE — site configuration
 * -----------------------------------------
 * Centralised business details, kept here as a single source rather
 * than repeated across every page.
 */
const CHAMBERS_CONFIG = {
  brandName: "Chambers Real Estate",
  positioning: "Property Solution | Brokerage | Investment",
  city: "Kano, Nigeria",
  phoneDisplay: "+234 803 951 8503",
  phoneTel: "+2348039518503",
  whatsappDisplay: "+234 912 003 0529",
  whatsappNumber: "2349120030529", // digits only, for wa.me links
  email: "chambersrestate@gmail.com",
  instagramHandle: "@chambers.ng",
  instagramUrl: "https://instagram.com/chambers.ng",
  xHandle: "@chambers.ng",
  xUrl: "https://x.com/chambers.ng",
  facebookName: "Kano Properties by Chambers",
  officeAddress: "No. 45 Lamido Crescent, Nasarawa GRA, Kano State",
  hoursNote: "Monday – Saturday, 9:00 AM – 6:00 PM",
  mapEmbedSrc: "https://www.google.com/maps?q=Lamido+Crescent+Nasarawa+GRA+Kano+Nigeria&output=embed",
  foundedYear: 2020,
  registrationNumber: "RC 1825810",
};

function waLink(message){
  return `https://wa.me/${CHAMBERS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function waPropertyLink(propertyName){
  return waLink(`Hello Chambers Real Estate, I'm interested in ${propertyName}. I'd like to know more about it.`);
}
