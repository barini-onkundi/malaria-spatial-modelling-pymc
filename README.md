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
This project uses simulated or anonymized survey-like data inspired by national malaria surveys and publicly available geospatial covariates (e.g., remote sensing data, population density).


