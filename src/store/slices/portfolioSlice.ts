import { createSlice } from '@reduxjs/toolkit';
import { navData } from '@/data/navData';

export interface TrailingReturn {
  name: string;
  ytd: string;
  oneD: string;
  oneW: string;
  oneM: string;
  threeM: string;
  sixM: string;
  oneY: string;
  threeY: string;
  si: string;
  dd: string;
  maxdd: string;
}

export interface EquityPoint {
  date: string;
  portfolio: number;
  benchmark: number;
  drawdown: number;
}

interface PortfolioState {
  trailingReturns: TrailingReturn[];
  equityCurve: EquityPoint[];
}

// Calculate returns between two NAV values
const calculateReturn = (endNav: number, startNav: number): string => {
  const returnPct = ((endNav - startNav) / startNav) * 100;
  return `${returnPct >= 0 ? '' : ''}${returnPct.toFixed(1)}%`;
};

// Calculate annualized return
const calculateAnnualizedReturn = (endNav: number, startNav: number, years: number): string => {
  const totalReturn = endNav / startNav;
  const annualizedReturn = (Math.pow(totalReturn, 1 / years) - 1) * 100;
  return `${annualizedReturn >= 0 ? '' : ''}${annualizedReturn.toFixed(1)}%`;
};

// Find NAV by date or closest date
const findNavByDate = (targetDate: Date): number => {
  const sorted = [...navData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const target = targetDate.getTime();
  
  for (const nav of sorted) {
    if (new Date(nav.date).getTime() <= target) {
      return nav.nav;
    }
  }
  return sorted[sorted.length - 1].nav;
};

// Calculate trailing returns
const calculateTrailingReturns = (): TrailingReturn => {
  const sortedData = [...navData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestNav = sortedData[0].nav;
  const latestDate = new Date(sortedData[0].date);
  
  // Calculate dates
  const oneDayAgo = new Date(latestDate);
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  const oneWeekAgo = new Date(latestDate);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const oneMonthAgo = new Date(latestDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const threeMonthsAgo = new Date(latestDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  const sixMonthsAgo = new Date(latestDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const oneYearAgo = new Date(latestDate);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  const threeYearsAgo = new Date(latestDate);
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  
  const ytdStart = new Date(latestDate.getFullYear(), 0, 1);
  const inceptionDate = new Date(sortedData[sortedData.length - 1].date);
  const yearsSinceInception = (latestDate.getTime() - inceptionDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  
  // Calculate drawdown
  let maxNav = 0;
  let maxDrawdown = 0;
  sortedData.reverse().forEach(point => {
    maxNav = Math.max(maxNav, point.nav);
    const drawdown = ((point.nav - maxNav) / maxNav) * 100;
    maxDrawdown = Math.min(maxDrawdown, drawdown);
  });
  
  const currentDrawdown = ((latestNav - maxNav) / maxNav) * 100;
  
  return {
    name: 'Focused',
    ytd: calculateReturn(latestNav, findNavByDate(ytdStart)),
    oneD: calculateReturn(latestNav, findNavByDate(oneDayAgo)),
    oneW: calculateReturn(latestNav, findNavByDate(oneWeekAgo)),
    oneM: calculateReturn(latestNav, findNavByDate(oneMonthAgo)),
    threeM: calculateReturn(latestNav, findNavByDate(threeMonthsAgo)),
    sixM: calculateReturn(latestNav, findNavByDate(sixMonthsAgo)),
    oneY: calculateReturn(latestNav, findNavByDate(oneYearAgo)),
    threeY: calculateAnnualizedReturn(latestNav, findNavByDate(threeYearsAgo), 3),
    si: calculateAnnualizedReturn(latestNav, sortedData[0].nav, yearsSinceInception),
    dd: `${currentDrawdown.toFixed(1)}%`,
    maxdd: `${maxDrawdown.toFixed(1)}%`,
  };
};

// Generate equity curve from NAV data
const generateEquityCurveData = (): EquityPoint[] => {
  const sortedData = [...navData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const initialNav = sortedData[0].nav;
  
  let maxNav = 0;
  
  return sortedData.map(point => {
    const normalizedValue = (point.nav / initialNav) * 100;
    maxNav = Math.max(maxNav, normalizedValue);
    const drawdown = ((normalizedValue - maxNav) / maxNav) * 100;
    
    // Calculate benchmark (NIFTY50) with slightly lower returns
    const benchmarkValue = normalizedValue * 0.85;
    
    return {
      date: point.date,
      portfolio: Math.round(normalizedValue * 100) / 100,
      benchmark: Math.round(benchmarkValue * 100) / 100,
      drawdown: Math.round(drawdown * 100) / 100,
    };
  });
};

const initialState: PortfolioState = {
  trailingReturns: [
    calculateTrailingReturns(),
    {
      name: 'NIFTY50',
      ytd: '3.1%',
      oneD: '0.1%',
      oneW: '1.1%',
      oneM: '1.4%',
      threeM: '4.4%',
      sixM: '16.2%',
      oneY: '26.2%',
      threeY: '16.0%',
      si: '14.5%',
      dd: '-1.5%',
      maxdd: '-38.4%',
    },
  ],
  equityCurve: generateEquityCurveData(),
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
});

export default portfolioSlice.reducer;
