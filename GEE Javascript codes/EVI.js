// Load Kenya boundary
var kenya = ee.FeatureCollection("FAO/GAUL/2015/level0")
  .filter(ee.Filter.eq('ADM0_NAME', 'Kenya'));

// Load MODIS Terra Vegetation Indices (16-day, 500m resolution)
var modisEVI = ee.ImageCollection("MODIS/006/MOD13A1")
  .filterDate('2022-01-01', '2022-12-31')
  .select('EVI');

// Compute the mean EVI for the year
var annualEVI2022 = modisEVI.mean().clip(kenya);

// Visualization parameters
var visParams = {
  min: 0,
  max: 8000,
  palette: ['white', 'yellow', 'green', 'darkgreen']
};

// Display EVI map
Map.centerObject(kenya, 6);
Map.addLayer(annualEVI2022, visParams, 'Mean EVI 2022');

// Export EVI to Google Drive
Export.image.toDrive({
  image: annualEVI2022,
  description: 'Kenya_MODIS_EVI_2022',
  scale: 500,
  region: kenya.geometry(),
  fileFormat: 'GeoTIFF'
});
