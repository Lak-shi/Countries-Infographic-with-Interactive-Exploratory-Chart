# DSCI 554 Assignment: Countries Infographic or Dashboard with Interactive Chart

## Description

### Objective

In this combined assignment, you will design and build a simple interactive infographic or dashboard to present information for 10 countries using data of your choice. The repository includes a `package.json` initialized with `npm init`.

## Countries Infographic with Interactive Exploratory Chart

### Dataset: United Nations data of your choice

1. **Data Collection**
   - Select UN data of your choice for 10 countries to implement the interactive bar chart
   - Download or fetch the necessary datasets

2. **Design**
   - Define who is the user and create user stories for the use cases you will implement
   - Create a wireframe of the design with an SVG tool
   - Include at least one bar chart with controls that allow the user to explore the data by ordering and filtering the countries. Include a mechanism to reset the chart to the initial state.
   - Use the visualization wheel to evaluate your design (infographic)
   - Apply appropriate visual encoding techniques to enhance information communication
   - Document your design in a Google Slide.

3. **Implementation**
   - Implement the bar chart using the latest D3 with data join general update pattern and margin conventions
   - Use D3 axes, with well formatted tick mark labels, axis labels and title.
   - Use Bootstrap to to customize the page according to your design and to implement controls (e.g., buttons and/or dropdowns).
   - Be aware that ordering and filtering operations are independent: users should be able to execute filtering and ordering operations independently.
   - Implement the chart in separate CSS and JavaScript files
   - Use smooth transitions appropriately to ensure object constancy.
   - Load data in JSON or CSV format

## Submission

- Document your dashboard design and important implementation details in a Google Slide presentation.
- Provide a link to the Google Slide at the bottom of the page
- Include all the source design files (wireframe, color palette, etc.) in the submission.
- Ensure that the dashboard is functional and displays correctly in Google Chrome and that there are no errors in DevTools.

## Rubrics

|               | **Design**              | **Implementation** |
| ------------- | ----------------------- | ----------------------- |
| **Sophisticated** (4-5 pts) | User stories are clear and comprehensive. Wireframe is detailed and thoughtful. Dashboard or Infographic includes an interactive bar chart with intuitive controls that allow to filter and order the data. Visual encoding techniques enhance data communication. Visualization wheel is thoughtfully used to evaluate the design (infographic). Google Slide presentation is polished and well-organized. | D3 implementation showcases advanced understanding. Data join general update pattern is flawlessly applied. Margin conventions are well used. D3 axes are well-designed with tick mark labels, axis labels, and title. Bootstrap is skillfully used for customization and control implementation. Filtering and ordering operations are smooth and independent. Transitions are seamless, ensuring object constancy. Data well formatted and loaded in JSON or CSV format. |
| **Competent** (2-3 pts) | User needs are mostly addressed, but with minor gaps. User stories cover essential aspects but are not comprehensive. Wireframe provides a basic overview of the design. Dashboard or Infographic includes an interactive bar chart but interactive features are not well thought through. Visual encoding techniques are applied with moderate effectiveness. Visualization wheel is present but not thoughtfully used to evaluate the design (infographic). Google Slide presentation is organized but lacks some details. | D3 implementation demonstrates basic understanding. Data join general update pattern is implemented with minor issues. Margin conventions are followed, but there are minor issues. D3 axes are present, but there are minor issues. Bootstrap usage is evident, but customization lacks finesse. Filtering and ordering operations work independently but with occasional hiccups. Transitions are present but not always seamless. Data has minor formatting issues and/or loading has minor errors. |
| **Needs work** (0-1 pts) | User needs are poorly addressed. User stories lack clarity and relevance. Wireframe is rudimentary and does not include major components. Visualization wheel is either missing or poorly utilized (infographic). Visual encoding techniques are minimal, hindering data communication. Google Slide presentation is disorganized and lacks coherence. | D3 implementation lacks understanding. Data join general update pattern is either incomplete or incorrect. Margin conventions are not used or are not well utilized. D3 axes are rudimentary, lacking essential elements. Bootstrap usage is minimal or incorrect. Filtering and ordering operations are problematic, hindering user experience. Transitions are absent or highly flawed, causing object constancy issues. Data formatting and loading have major errors. |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in Chrome
