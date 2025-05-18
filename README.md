# Spatial modelling of malaria in lake region counties of Kenya using pymc library in Python
*Malaria remains a major public health challenge in Kenya, particularly in the Lake Region counties—including Kisumu, Homa Bay, Siaya, and Migori—where the disease is endemic due to favorable ecological conditions for Anopheles mosquitoes. Malaria is transmitted through the bite of an infected mosquito, which acquires the Plasmodium parasite by feeding on an infected person. Unlike some diseases, malaria cannot be spread directly from person to person.

This repository presents a Bayesian spatial modeling framework to estimate malaria prevalence across the Lake Region of Kenya, including locations where survey data is not directly available. The model quantifies spatial variation and assesses the influence of covariates such as climate, elevation, and population density on malaria transmission.

🔍 Objective
To predict malaria prevalence at unsampled locations and quantify the effects of key environmental and demographic predictors using a Bayesian geostatistical approach.

📂 Contents
notebooks/ — Jupyter/Colab notebooks with model development and visualization.

data/ — Example datasets (simulated or preprocessed).

models/ — Bayesian model specifications using PyMC.

output/ — Posterior summaries, prediction maps, and diagnostics.

README.md — Project overview and instructions.

requirements.txt — Python package dependencies.

🛠️ Methods
Bayesian geostatistical modeling using PyMC.

Spatial smoothing via Gaussian Processes or HSGP priors.

Covariate effects estimation with credible intervals.

Generation of prediction surfaces across endemic counties.

Data Source
| **Dataset / Source**                          | **Type**                        | **Resolution**          | **Use Case**                                  | **Access**                                                                 |
|-----------------------------------------------|----------------------------------|--------------------------|-----------------------------------------------|-----------------------------------------------------------------------------|
| **MODIS (MOD13Q1)**                           | Vegetation Index (NDVI/EVI)     | 250m (16-day)            | Land cover, vegetation health                  | [NASA Earthdata](https://earthdata.nasa.gov/)                             |
| **CHIRPS**                                     | Rainfall                        | ~5km (~0.05°) daily      | Rainfall estimates, seasonality                | [CHIRPS](https://www.chc.ucsb.edu/data/chirps)                            |
| **WorldClim**                                  | Bioclimatic variables           | ~1km (30 arc-seconds)    | Temperature, precipitation                     | [WorldClim](https://www.worldclim.org/)                                   |
| **SRTM**                                       | Elevation                       | 30m                      | Topographic variation, vector habitat mapping  | [USGS EarthExplorer](https://earthexplorer.usgs.gov/)                     |
| **ESA WorldCover 10m**                         | Land cover                      | 10m                      | Classification of land surface types           | [ESA WorldCover](https://esa-worldcover.org/)                             |
| **GPWv4 (Gridded Population of the World)**    | Population density              | ~1km (30 arc-seconds)    | Human population exposure                      | [SEDAC CIESIN](https://sedac.ciesin.columbia.edu/data/collection/gpw-v4)  |
| **Copernicus Global Land Service (CGLS)**      | Soil moisture, LAI, etc.        | 1km                      | Vegetation and land processes                  | [Copernicus](https://land.copernicus.eu/)                                 |
| **VIIRS Nighttime Lights**                    | Radiance                        | ~500m                    | Proxy for urbanization, economic activity      | [NOAA](https://eogdata.mines.edu/download_dnb_composites.html)           |



