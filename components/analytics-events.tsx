"use client"

import { sendGAEvent } from "@next/third-parties/google"

// Contact form tracking
export const trackContactForm = (method: "phone" | "email" | "form") => {
  sendGAEvent("event", "contact_form_interaction", {
    contact_method: method,
    event_category: "engagement",
    event_label: `Contact via ${method}`,
  })
}

// Newsletter signup tracking
export const trackNewsletterSignup = () => {
  sendGAEvent("event", "newsletter_signup", {
    event_category: "engagement",
    event_label: "Newsletter subscription",
  })
}

// Accommodation inquiry tracking
export const trackAccommodationInquiry = (accommodationType: string) => {
  sendGAEvent("event", "accommodation_inquiry", {
    accommodation_type: accommodationType,
    event_category: "business",
    event_label: `Interest in ${accommodationType}`,
  })
}

// Package view tracking
export const trackPackageView = (packageName: string) => {
  sendGAEvent("event", "package_view", {
    package_name: packageName,
    event_category: "business",
    event_label: `Viewed ${packageName} package`,
  })
}

// Activity interest tracking
export const trackActivityInterest = (activityName: string) => {
  sendGAEvent("event", "activity_interest", {
    activity_name: activityName,
    event_category: "engagement",
    event_label: `Interest in ${activityName}`,
  })
}

// Phone call tracking
export const trackPhoneCall = () => {
  sendGAEvent("event", "phone_call_click", {
    event_category: "contact",
    event_label: "Phone number clicked",
  })
}

// Email click tracking
export const trackEmailClick = () => {
  sendGAEvent("event", "email_click", {
    event_category: "contact",
    event_label: "Email address clicked",
  })
}

// Social media tracking
export const trackSocialMedia = (platform: string) => {
  sendGAEvent("event", "social_media_click", {
    platform: platform,
    event_category: "social",
    event_label: `${platform} link clicked`,
  })
}

// Gallery interaction tracking
export const trackGalleryView = (imageCategory: string) => {
  sendGAEvent("event", "gallery_interaction", {
    image_category: imageCategory,
    event_category: "engagement",
    event_label: `Viewed ${imageCategory} images`,
  })
}

// Audio control tracking
export const trackAudioControl = (action: "play" | "pause" | "mute" | "unmute") => {
  sendGAEvent("event", "audio_control", {
    audio_action: action,
    event_category: "media",
    event_label: `Audio ${action}`,
  })
}

// Page scroll tracking
export const trackScrollDepth = (depth: number) => {
  sendGAEvent("event", "scroll_depth", {
    scroll_percentage: depth,
    event_category: "engagement",
    event_label: `Scrolled ${depth}%`,
  })
}

// Booking attempt tracking
export const trackBookingAttempt = (packageType: string) => {
  sendGAEvent("event", "booking_attempt", {
    package_type: packageType,
    event_category: "conversion",
    event_label: `Booking attempt for ${packageType}`,
  })
}

// Export all tracking functions as a single object for easier imports
export const trackEvent = {
  contactForm: trackContactForm,
  newsletterSignup: trackNewsletterSignup,
  accommodationInquiry: trackAccommodationInquiry,
  packageView: trackPackageView,
  activityInterest: trackActivityInterest,
  phoneCall: trackPhoneCall,
  emailClick: trackEmailClick,
  socialMedia: trackSocialMedia,
  galleryView: trackGalleryView,
  audioControl: trackAudioControl,
  scrollDepth: trackScrollDepth,
  bookingAttempt: trackBookingAttempt,
}
