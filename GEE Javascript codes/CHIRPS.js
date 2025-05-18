// Load CHIRPS daily precipitation for 2022
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
  .filterDate('2022-01-01', '2022-12-31')
  .select('precipitation');

// Sum daily precipitation to get annual total
var annualPrecip2022 = chirps.sum();  // Units: mm/year

// Set default projection from a reference image
var refImg = chirps.first();
var nativeProj = refImg.projection();
annualPrecip2022 = annualPrecip2022.setDefaultProjection(nativeProj);

// Resample to 1km and reproject to desired CRS
var precip_1km = annualPrecip2022
  .reduceResolution({
    reducer: ee.Reducer.mean(),
    maxPixels: 1024
  })
  .reproject({
    crs: 'EPSG:32736',
    scale: 1000
  });

// Clip to boundary
var clipped = precip_1km.clip(boundary);

// Display
Map.centerObject(boundary, 7);
Map.addLayer(clipped, {min: 0, max: 2000, palette: ['lightblue', 'blue', 'purple']}, 'Annual Precip 2022 (mm)');

// Export to Google Drive
Export.image.toDrive({
  image: clipped,
  description: 'Annual_Precip_2022_1km',
  folder: 'GEE_exports',
  fileNamePrefix: 'annual_precip_2022_1km',
  region: boundary.geometry(),
  scale: 1000,
  crs: 'EPSG:32736',
  maxPixels: 1e13
});
