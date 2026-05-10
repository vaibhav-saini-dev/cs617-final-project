# cs617-final-project

Created for our CS 617 Final Project.

## Project Overview
A data storytelling project exploring how behavioral health issues affects hospital length of stay in Massachusetts emergency departments between 2016 and 2019, while also using outside sources to reveal patterns on how stay lengths can effect overcrowding, shorter stay lengths increasing readmission cycles, and how mental health visits are more likely to exceed 6 and 12 hours.

The project combines interactive visualizations, healthcare research, and narrative design to show how behavioral health issues can place additional pressure on emergency care systems.

## Frameworks/Tools Used
- Next.js
- Tailwind CSS
- Plotly.js
- Framer Motion
- Pandas (to parse Excel data sheet)
- NumPy (to parse Excel data sheet)

## Datasets
- [Massachusetts Acute Care Hospital Emergency Department Data October 2016 through June 2019](https://www.chiamass.gov/assets/docs/r/Case-Mix-Reports/CSMR-EDD-Legacy-Databook-10-01-2016-to-06-30-2019.xlsx)

Additional Datasets
- https://pmc.ncbi.nlm.nih.gov/articles/PMC9223052/
- https://www.tac.org/reports_publications/released-relapsed-rehospitalized-length-of-stay-and-readmission-rates-in-state-hospitals-a-comparitive-state-survey/
- https://www.sciencedirect.com/science/article/pii/S0022395620308657

## Getting Started

Clone the repository, cd into cs617-final-project/project, and then install dependencies:

```bash
npm install
npm install framer-motion react-plotly.js plotly.js react-icons
```

Then, run the development server through

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authors
[Vaibhav Saini](https://vsaini-portfolio.vercel.app/)

[Erik Williamson](https://github.com/Erikfirstofhisname)