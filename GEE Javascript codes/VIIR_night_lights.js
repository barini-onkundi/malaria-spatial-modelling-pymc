// Load VIIRS NTL collection for 2022
var viirs = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .filterDate('2022-01-01', '2022-12-31')
  .select('avg_rad');

// Get projection from one of the original monthly images
var referenceImage = viirs.first();
var nativeProjection = referenceImage.projection();

// Compute mean NTL for 2022 and set default projection
var ntl_2022 = viirs.mean()
  .setDefaultProjection(nativeProjection);

// Now reduce resolution to 1km
var ntl_1km = ntl_2022
  .reduceResolution({
    reducer: ee.Reducer.mean(),
    maxPixels: 1024
  })
  .reproject({
    crs: 'EPSG:32736',
    scale: 1000
  });

// Clip to boundary
var clipped = ntl_1km.clip(boundary);

// Display
Map.centerObject(boundary, 8);
Map.addLayer(clipped, {min: 0, max: 30, palette: ['black', 'blue', 'yellow', 'white']}, 'NTL 2022 (1km)');

// Export to Google Drive
Export.image.toDrive({
  image: clipped,
  description: 'NTL_2022_1km',
  folder: 'GEE_exports',
  fileNamePrefix: 'ntl_2022_1km',
  region: boundary.geometry(),
  scale: 1000,
  crs: 'EPSG:32736',
  maxPixels: 1e13
});
