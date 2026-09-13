/**
 * CHAMBERS REAL ESTATE — LISTING DATA
 * -----------------------------------------------------------------
 * Property and development records for the website. Structured as a
 * simple array so it can be swapped for a live data source later
 * without changing how the pages render.
 * -----------------------------------------------------------------
 */

const IMG = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
  p1: "img/pdf-house-1.jpg",
  p1b:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  p1c:"img/pdf-interior-1.jpg",
  p1d:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
  p2: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
  p3: "img/pdf-house-2.jpg",
  p4: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop",
  p5: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
  p6: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop",
  land1:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
  land2:"https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
  comm1:"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
  dev1: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
  dev2: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
  aboutA:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
  aboutB:"https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=1200&auto=format&fit=crop",
  agent:"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
  ig1:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=500&auto=format&fit=crop",
  ig2:"https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500&auto=format&fit=crop",
  ig3:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=500&auto=format&fit=crop",
};

const PROPERTIES = [
];

const DEVELOPMENTS = [
];

function getPropertyById(id){ return PROPERTIES.find(p => p.id === id); }
function getDevelopmentById(id){ return DEVELOPMENTS.find(d => d.id === id); }
