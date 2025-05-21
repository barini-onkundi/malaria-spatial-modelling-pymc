# 🦟 Spatial Modeling of Malaria in Kenya’s Lake Region Using Bayesian Geostatistics (PyMC)

Malaria remains a major public health concern in Kenya, especially in the Lake Region counties—Kisumu, Homa Bay, Siaya, and Migori—where year-round transmission is driven by favorable ecological conditions for *Anopheles* mosquitoes. This project applies a Bayesian geostatistical framework to model malaria prevalence, incorporating spatial correlation and environmental predictors.

> 📌 **Goal**: Predict malaria prevalence at unsampled locations and quantify the influence of environmental and demographic factors using a fully Bayesian spatial model implemented in Python (PyMC).

---

## 🔍 Objectives

- Estimate malaria prevalence at locations without direct survey data.
- Quantify the spatial heterogeneity of transmission using a spatial random field.
- Incorporate satellite-derived covariates (e.g. EVI, rainfall, temperature).
- Apply an efficient **Hilbert Space Gaussian Process (HSGP)** prior to enable scalable spatial modeling.
- Generate prediction surfaces with uncertainty quantification.

---

## 🧪 Methodology

### 🧭 Model Structure

The Bayesian model is built using `PyMC`, with the following key components:

- **Response**: Number of malaria-positive individuals per cluster (Binomial likelihood).
- **Predictors**: Environmental covariates extracted from high-resolution raster data.
- **Spatial Effect**: Modeled using an HSGP prior with a Matern-3/2 kernel.
- **Link Function**: Logit link for modeling malaria prevalence.
- **Priors**: Weakly informative Gaussian priors on regression coefficients, Gamma prior on the GP length scale.

### ✳️ Model Equation

Let \( p_i \) denote the malaria prevalence at location \( i \), and \( s_i \) be the spatial effect:

\[
\text{logit}(p_i) = \beta_0 + \beta_1 \cdot \text{EVI}_i + \beta_2 \cdot \text{Temp}_i + \dots + \beta_k \cdot X_{ik} + s_i
\]

The likelihood is:

\[
\text{Pos}_i \sim \text{Binomial}(n_i, p_i)
\]

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

## 📊 Posterior Inference & Predictions

- Posterior samples are obtained using `pm.sample()` in PyMC with appropriate tuning and convergence checks.
- Prediction surfaces (mean and credible intervals) are generated on a uniform grid using the fitted model.
- In-sample fit is assessed using RMSE and posterior predictive checks.

---

## 📖 Viewing & Sharing

The main analysis notebook can be viewed via **NBViewer**:

🔗 [View Notebook on NBViewer](https://nbviewer.org/github/YOUR_USERNAME/malaria-spatial-model/blob/main/notebooks/spatial_modeling.ipynb)

For full reproducibility (including R and JS preprocessing), visit the complete GitHub repository:

🔗 [GitHub Repository](https://github.com/YOUR_USERNAME/malaria-spatial-model)

---

## 📌 Notes

- Data used here is either public (satellite) or simulated survey data due to licensing restrictions.
- This project was developed to demonstrate skills in spatial modeling, Bayesian inference, and integrating multi-source spatial data.

---

## 📧 Contact

For questions, collaborations, or access to the complete dataset, contact:

**O_@2025**  
_Data Science | Spatial Modeling | AI for Global Health_  
📫 [YourEmail@example.com]  

---

