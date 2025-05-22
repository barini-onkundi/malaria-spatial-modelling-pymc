# Spatial Modeling of Malaria Prevalence Modeling in Western Endemic Zone of Kenya

Malaria continues to pose a significant public health burden in Kenya, with the western and coastal regions bearing a disproportionate share of the disease burden (https://www.severemalaria.org/statistics-facts-by-country/kenya). According to 2020 Kenya Malaria Indicator Survey, the Lake endemic region consisting of Kisumu, Homa Bay, Siaya, Busia, Vihiga, Bungoma and Migori recorded a prevalence ranging between 11% and 19% (https://statistics.knbs.or.ke/nada/index.php/catalog/111). Year-round transmission in these areas is sustained by ecological conditions that favor the survival and breeding of *Anopheles* mosquitoes. This project applies a Bayesian geostatistical framework to model malaria prevalence using environmental predictors. 

> **Goal**: Estimate malaria prevalence at unsampled locations by leveraging environmental and demographic factors through a fully Bayesian spatial model implemented in Python using PyMC.

---

## Objectives

- Estimate malaria prevalence at locations without survey data.
- Quantify the spatial heterogeneity of transmission using a spatial random field.
- Apply an efficient **Hilbert Space Gaussian Process (HSGP)** prior to enable scalable spatial modeling.
- Generate prediction surfaces with uncertainty quantification using satellite derived covariates.

---

## Methodology

### Model specification

We're using a **binomial likelihood model** to analyze malaria prevalence. For each location $i$, the observed number of positive cases, $Y_i$, is modeled as:

$$Y_i \sim \text{Binomial}(n_i, P(x_i))$$

Here, $n_i$ represents the total number of individuals tested for malaria at location $x_i$, and $P(x_i)$ is the underlying prevalence of malaria at that specific location.

---

To link the prevalence $P(x_i)$ to our covariates, we use a logit link function:

$$\text{logit}(P(x_i)) = \beta_0 + \beta_1 \cdot \text{evi} + \beta_2 \cdot \text{temp} + \beta_3 \cdot \text{precip} + \beta_4 \cdot \text{dist} + \beta_5 \cdot \text{elev} + \beta_6 \cdot \text{net} + \beta_7 \cdot \text{pop} + S(x_i)$$

---

In this equation:
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

