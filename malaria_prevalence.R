#---this code is for donwloading malaria data from malaria atlas map
#---install malaria atlas package
install.packages("malariaAtlas") 

#---required libraries
library(malariaAtlas)
library(readr)
library(dplyr)

#---download prevalence data
kenya_pfpr <- getPR(country = "Kenya", species = "Pf")

#---view data
head(kenya_pfpr)

kenya_pfpr<-kenya_pfpr%>%select(longitude, latitude,

                                positive, examined, pr)

#--rename columns

kenya_pfpr<-kenya_pfpr%>%rename(
  total_positive=positive,
  total_tested=examined,
  prevalence= pr
)

#---write to csv file
write.csv(kenya_pfpr, "pr_data.csv", row.names = FALSE)
