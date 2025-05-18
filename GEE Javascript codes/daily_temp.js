// Load ERA5-Land hourly temperature and convert to Celsius
var era5 = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
  .filterDate('2022-01-01', '2023-01-01')
  .select('temperature_2m')
  .map(function(img) {
    return img.subtract(273.15).copyProperties(img, img.propertyNames());
  });

// Create list of months
var months = ee.List.sequence(1, 12);

// Compute monthly means
var monthlyMeans = ee.ImageCollection(
  months.map(function(m) {
    var start = ee.Date.fromYMD(2022, m, 1);
    var end = start.advance(1, 'month');
    return era5.filterDate(start, end).mean().set('month', m);
  })
);

// Compute annual mean from monthly means
var annualMean = monthlyMeans.mean().clip(boundary);

// Visualize
Map.centerObject(boundary, 6);
Map.addLayer(annualMean, {min: 10, max: 40, palette: ['blue', 'green', 'yellow', 'red']}, 'Mean Monthly Temp 2022');

// Export
Export.image.toDrive({
  image: annualMean,
  description: 'Mean_Monthly_Temp_2022_ERA5',
  folder: 'GEE_exports',
  fileNamePrefix: 'Mean_Monthly_Temp_2022_ERA5',
  region: boundary.geometry(),
  scale: 1000,
  crs: 'EPSG:32736',
  maxPixels: 1e13
});
