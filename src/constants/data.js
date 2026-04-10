export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Therapists', href: '#' },
  { label: 'How It Works', href: '#how-it-works' },
];

export const heroStats = [
  { num: '1.2K+', label: 'Happy Clients' },
  { num: '4.9\u2605', label: 'Average Rating' },
  { num: '\u226460\'', label: 'Arrival Time' },
];

export const heroServices = [
  { id: 1, emoji: '\uD83D\uDC86', name: 'Full Body Massage', duration: '60 minutes', price: 'Rp 120K' },
  { id: 2, emoji: '\uD83E\uDDB6', name: 'Foot Reflexology', duration: '45 minutes', price: 'Rp 85K' },
  { id: 3, emoji: '\uD83C\uDF3F', name: 'Aromatherapy', duration: '90 minutes', price: 'Rp 165K' },
];

export const therapistAvatars = [
  { initials: 'SR', color: '#c4956a' },
  { initials: 'DY', color: '#8b6f5c' },
  { initials: '+8', color: '#5c3d2b' },
];

export const steps = [
  { num: '01', title: 'Choose a Service', desc: 'Select your preferred massage type and duration to suit your needs.' },
  { num: '02', title: 'Schedule a Time', desc: 'Pick a convenient time \u2014 available from morning until midnight.' },
  { num: '03', title: 'Therapist Arrives', desc: 'A certified professional therapist arrives at your location within 60 minutes.' },
  { num: '04', title: 'Pay & Enjoy', desc: 'Pay via bank transfer, e-wallet, or cash. Relax and leave the rest to us.' },
];

export const services = [
  {
    emoji: '\uD83D\uDC86',
    tag: 'Most Popular',
    name: 'Full Body Massage',
    desc: 'Total body relaxation using Swedish and Shiatsu techniques by certified therapists.',
    price: 'Rp 120.000',
    duration: '60 min',
    featured: false,
    revealType: 'fade-left',
  },
  {
    emoji: '\uD83C\uDF3F',
    tag: 'Premium',
    name: 'Luxury Aromatherapy',
    desc: 'A blended massage with premium essential oils for complete peace of mind and body.',
    price: 'Rp 165.000',
    duration: '90 min',
    featured: true,
    revealType: 'zoom',
  },
  {
    emoji: '\uD83E\uDDB6',
    tag: 'Affordable',
    name: 'Foot Reflexology',
    desc: 'Targeted acupressure on foot reflex points to improve circulation and relieve fatigue.',
    price: 'Rp 85.000',
    duration: '45 min',
    featured: false,
    revealType: 'fade-right',
  },
];

export const serviceOptions = [
  'Full Body Massage \u2014 Rp 120K',
  'Foot Reflexology \u2014 Rp 85K',
  'Aromatherapy \u2014 Rp 165K',
];

export const timeSlots = [
  '08.00', '10.00', '12.00', '14.00', '16.00', '18.00', '20.00', '22.00',
];

export const testimonials = [
  {
    stars: 5,
    text: '"The therapist arrived right on time and was extremely professional. The massage was amazing \u2014 my body feels completely refreshed. Definitely a regular from now on!"',
    initials: 'RD',
    name: 'Riana Dewi',
    location: 'Kemang, South Jakarta',
  },
  {
    stars: 5,
    text: '"Booked at 9 PM, therapist arrived by 10. The aromatherapy session gave me the best sleep I\'ve had in months. 10/10!"',
    initials: 'AH',
    name: 'Ahmad Hakim',
    location: 'BSD, South Tangerang',
  },
  {
    stars: 5,
    text: '"Perfect for expecting mothers! They have a special prenatal package and the therapist was well-trained. Safe and comfortable."',
    initials: 'SF',
    name: 'Sari Fitria',
    location: 'Kelapa Gading, North Jakarta',
  },
];
