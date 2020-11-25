# US election dashboard
 
An interactive dashboard providing an overview of the US Presidency, Senate and House elections taking place on November 3rd 2020. This project was produced as part of a final dissertation project for an MSc in Computational and Data Journalism at Cardiff University. 

Its aim was to provide an interactive dashboard as an overview of the US Presidency, Senate and House elections which took place on November 3rd 2020. It also brings together other US election projects created by the author for The Guardian, while completing a Google News Initative Fellowship with Guardian Visuals in the summer/autumn of 2020. 

The graphics-led analysis page takes a look at key dynamics of the 2020 elections; including how Joe Biden won, the ways coronavirus affected vote counts, and what happened in Congress.

## Data Sources
The 'Methodology' section at the bottom of the project provides information about the data sources used in this projects. They are also listed below:

#### Dashboard
* 2020 Projections for the Presidency, House and Senate: [Cook Political Ratings](https://cookpolitical.com/ratings)
* [Tabula](https://tabula.technology/) - used to scrape electoral ratings from Cook Political's PDF
* 2016 Presidential election results & electoral vote counts by state: [Federal Election Commission](https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/federal-elections-2016/)
* Current breakdowns of the House and Senate: [Congress.gov](https://www.congress.gov/members?q=%7B%22congress%22%3A116%7D)

#### Analysis
* State-level results for the Presidency, Senate & House are sourced from [Decision Desk HQ](https://results.decisiondeskhq.com/).
* Historical election data is sourced from the [Federal Election Commission](https://www.fec.gov/introduction-campaign-finance/election-and-voting-information/).
* County-level 2020 election results are sourced from [Fabio Votta's GitHub repo](https://github.com/favstats/USElection2020-NYT-Results) which scrapes data from the New York Times' live results page.
* County-level urban/rural definitions are determined by [Census.gov's 2010 urban/rural classification](https://www.census.gov/programs-surveys/geography/guidance/geo-areas/urban-rural.html), while county-level educational attainment data comes from the [2018 American Community Survey 5-year estimates](https://data.census.gov/cedsci/table?q=Educational Attainment&tid=ACSST1Y2019.S1501&hidePreview=false).
* Rules on when states can start counting mail-in ballots were sourced from the [National Conference of State Legislatures](https://www.ncsl.org/research/elections-and-campaigns/vopp-table-16-when-absentee-mail-ballot-processing-and-counting-can-begin.aspx), [Ballotpedia](https://www.ncsl.org/research/elections-and-campaigns/vopp-table-16-when-absentee-mail-ballot-processing-and-counting-can-begin.aspx) and [NPR](https://www.npr.org/2020/10/23/926258497/when-will-mail-in-ballots-be-counted-see-states-processing-timelines?t=1604709442776).
* Time series data on how the vote counts progressed were sourced from the [New York Times'](https://www.nytimes.com/interactive/2020/11/03/us/elections/results-president.html) live results page.
* Data on historical control of Congress was sourced from [Senate.gov](https://www.senate.gov/history/partydiv.htm) and [House.gov](https://history.house.gov/Institution/Party-Divisions/Party-Divisions/).
* Data on diversity in Congress by gender and ethnicity was sourced from the [Brookings Institute](https://www.brookings.edu/multi-chapter-report/vital-statistics-on-congress/), [Senate.gov](https://www.senate.gov/senators/EthnicDiversityintheSenate.htm) and the [Congressional Research Service](https://fas.org/sgp/crs/misc/RL30378.pdf).

## Scraping Cook projections
This repo contains scripts for scraping Cook Political projections of the House and Senate using Python and BeautifulSoup:
* [House - scraping script](data/house.ipynb)
* [Senate - scraping script](data/senate.ipynb)
