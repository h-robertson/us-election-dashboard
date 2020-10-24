# US election dashboard
 
An interactive dashboard providing an overview of the US Presidency, Senate and House elections taking place on November 3rd 2020. This project was produced as part of a final dissertation project for an MSc in Computational and Data Journalism at Cardiff University. 

It's aim was to provide an interactive dashboard as an overview of the US Presidency, Senate and House elections taking place on November 3rd 2020. It also brings together other US election projects created by the author for The Guardian, while completing a Google News Initative Fellowship with Guardian Visuals in the summer/autumn of 2020. 

## Data Sources
The 'Methodology' section at the bottom of the project provides information about the data sources used in this projects. They are also listed below:

* 2020 Projections for the Presidency, House and Senate: [Cook Political Ratings](https://cookpolitical.com/ratings)
* [Tabula](https://tabula.technology/) - used to scrape electoral ratings from Cook Political's PDF
* 2016 Presidential election results & electoral vote counts by state: [Federal Election Commission](https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/federal-elections-2016/)
* Current breakdowns of the House and Senate: [Congress.gov](https://www.congress.gov/members?q=%7B%22congress%22%3A116%7D)

## Methodology
This repo contains scripts for scraping Cook Political projections of the House and Senate using Python and BeautifulSoup:
* [House - scraping script](house.ipynb)
* [Senate - scraping script](senate.ipynb)
