// Add this at the top of your component file
declare module 'google-maps-current-location' {
    export default function addCurrentLocation(map: google.maps.Map): void;
  }
  
  // Now you can use the import if needed
  import addCurrentLocation from 'google-maps-current-location';
  