# Spatial Modeling of Malaria in Kenya’s Lake Region Using Bayesian Geostatistics (PyMC)

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

The Bayesian model is built using `PyMC`, with the following key components:

- **Response**: Number of malaria-positive individuals per survey cluster.
- **n**: Total number of individuals tested pr survey cluster. 
- **Predictors**: Environmental covariates extracted from high-resolution raster data.
- **Spatial Effect**: Modeled using an HSGP prior with a Matern-3/2 kernel.
- **Link Function**: Logit link for modeling malaria prevalence.
- **Priors**: Weakly informative Gaussian priors on regression coefficients, Gamma prior on the GP length scale.

### Model Equation

Let $\ p_i \$ denote the malaria prevalence at location $\ i \$, and $\ s_i \$ be the spatial effect:

$\text{logit}p_i = \beta_0 + \beta_1 \cdot \text{EVI}_i + \beta_2 \cdot \text{Temp}_i + \dots + \beta_k \cdot X_{ik} + s_i\$


The likelihood is:

$\text{Pos}_i \sim \text{Binomial}(n_i, p_i)$

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

## 🗂 Project Structure
<pre><code> ## 🗂 Project Structure ``` malaria-spatial-model/ ├── notebooks/ # Jupyter/Colab notebooks for model development & plots ├── data/ # Preprocessed datasets & spatial covariates (not included) ├── models/ # PyMC model code using HSGP for spatial inference ├── output/ # Posterior summaries and prediction surfaces ├── scripts/ │ ├── preprocess_r.R # R code for raster extraction and cleaning │ └── download_rasters.js # JavaScript for bulk downloading Earth Engine assets ├── requirements.txt # Python package dependencies └── README.md # Project overview (this file) ``` </code></pre>


---

## Posterior Inference & Predictions

- Posterior samples are obtained using `pm.sample()` in PyMC with appropriate tuning and convergence checks.
- Prediction surfaces (mean and credible intervals) are generated on a uniform grid using the fitted model.
- In-sample fit is assessed using RMSE and posterior predictive checks.

---

## Viewing & Sharing

The main analysis notebook can be viewed via **NBViewer**:

 [View Notebook on NBViewer](https://nbviewer.org/github/YOUR_USERNAME/malaria-spatial-model/blob/main/notebooks/spatial_modeling.ipynb)

For full reproducibility (including R and JS preprocessing), visit the complete GitHub repository:

 [GitHub Repository](https://github.com/YOUR_USERNAME/malaria-spatial-model)

---

## Notes

- Data used here is either public (satellite) or simulated survey data due to licensing restrictions.
- This project was developed to demonstrate skills in spatial modeling, Bayesian inference, and integrating multi-source spatial data.

---
**O_@2025**  
_Data Science | Spatial Modeling | AI for Global Health_  
📫 [YourEmail@example.com]  

---

