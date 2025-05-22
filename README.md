# Spatial Modeling of Malaria Prevalence Modeling in Western Endemic Zone of Kenya

Malaria continues to pose a significant public health burden in Kenya, with the western and coastal regions bearing a disproportionate share of the disease burden (https://www.severemalaria.org/statistics-facts-by-country/kenya). The 2020 Kenya Malaria Indicator Survey reported significant malaria prevalence within the Lake endemic region, encompassing the counties of Kisumu, Homa Bay, Siaya, Busia, Vihiga, Bungoma, and Migori. Within this region, prevalence rates were observed to range from 11% to 19% (Kenya National Bureau of Statistics, 2020). The persistent year-round transmission observed in these areas is primarily attributed to favorable ecological conditions that support the sustained survival, development, and breeding cycles of Anopheles mosquitoes, the primary vectors of malaria. This project employs a Bayesian geostatistical framework to model and estimate malaria prevalence, integrating various environmental predictors to account for spatial heterogeneity and environmental drivers of disease transmission

## Project Aim

The primary aim of this project is to infer malaria prevalence at unobserved geographical locations by integrating environmental and demographic covariates within a comprehensive Bayesian geostatistical modeling framework. This framework will be implemented using the PyMC probabilistic programming library in Python.


## Methodology

### Model specification

We're using a **binomial likelihood model** to analyze malaria prevalence. For each location $i$, the observed number of positive cases, $Y_i$, is modeled as:

$$Y_i \sim \text{Binomial}(n_i, P(x_i))$$

Here, $n_i$ represents the total number of individuals tested for malaria at location $x_i$, and $P(x_i)$ is the underlying prevalence of malaria at that specific location.

---

To link the prevalence $P(x_i)$ to our covariates, we use a logit link function:

$$\text{logit}(P(x_i)) = \beta_0 + \beta_1 \cdot \text{evi} + \beta_2 \cdot \text{temp} + \beta_3 \cdot \text{precip} + \beta_4 \cdot \text{dist} + \beta_5 \cdot \text{elev} + \beta_6 \cdot \text{net} + \beta_7 \cdot \text{pop} + S(x_i)$$

---

Where:
* $\beta_0$ is the **intercept**.
* $\beta_1, \dots, \beta_7$ are the **coefficients** for the environmental and demographic covariates, which include Enhanced Vegetation Index ($\text{evi}$), temperature ($\text{temp}$), precipitation ($\text{precip}$), distance to nearest health facility ($\text{dist}$), elevation ($\text{elev}$), net usage ($\text{net}$), and population density ($\text{pop}$).
* $S(x_i)$ is a **zero-mean Gaussian Process** with a Matérn covariance function ($\nu=3/2$). We'll approximate this spatial effect using a **Hilbert Space Gaussian Process (HSGP)** to efficiently capture geographical correlation.

## Usage

To run this model, clone the repository and follow the instructions in `malaria_prevalence.ipynb`.

---

## 🌐 Data Sources and Predictors

Environmental and demographic predictors used in the model are summarized below:

| **Variable**                     | **Description**                          | **Native Resolution** | **Source**                                                                 |
|----------------------------------|------------------------------------------|------------------------|-----------------------------------------------------------------------------|
| **Precipitation**               | Daily rainfall estimates                  | ~5km (0.05°)           | [CHIRPS](https://www.chc.ucsb.edu/data/chirps)                              |
| **Temperature**                 | Monthly mean temperatures                 | ~1km                   | [WorldClim](https://www.worldclim.org/)                                     |
| **Elevation**                   | Digital elevation data                    | 30m                    | [SRTM](https://earthexplorer.usgs.gov/)                                     |
| **EVI**                         | Enhanced Vegetation Index (proxy for land cover) | 250m                   | [MODIS MOD13Q1](https://modis.gsfc.nasa.gov/data/dataproducts/mod13.php)   |
| **Distance to Water**          | Distance to nearest water body (rasterized) | ~30m-90m               | Derived using [HydroSHEDS](https://www.hydrosheds.org/) and custom scripts |
| **Population Density**         | Human population per grid cell            | ~1km                   | [WorldPop](https://www.worldpop.org/)                                       |
| **Mosquito Net Use**           | Proportion of household mosquito net use  | ~5km                   | DHS survey, rasterized estimates                                            |

---

## Posterior Inference & Predictions

- Posterior samples are obtained using `pm.sample()` in PyMC with appropriate tuning and convergence checks.
- Prediction surfaces (mean and credible intervals) are generated on a uniform grid using the fitted model.
- In-sample fit is assessed using RMSE and posterior predictive checks.

---

## Viewing & Sharing

The main analysis notebook can be viewed via **NBViewer**:

[View Notebook on NBViewer](https://nbviewer.org/github/barini-onkundi/malaria-spatial-modelling-pymc/blob/main/malaria_prevalence.ipynb)

For full reproducibility (including R and JS preprocessing), included in the current repository. 

---
_Data Science | Spatial Modeling | AI for Global Health_  
[barini@jkuat.ac.ke]  

---

