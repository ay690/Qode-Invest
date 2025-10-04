import { createSlice } from "@reduxjs/toolkit";

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
}

interface BlogState {
  posts: BlogPost[];
}

const initialState: BlogState = {
  posts: [
    {
      id: "1",
      date: "Apr 18, 2024",
      title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
      excerpt:
        "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold. Read more...",
    },
    {
      id: "2",
      date: "Apr 05, 2024",
      title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
      excerpt:
        "Unlock this post by trail. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation....",
    },
    {
      id: "3",
      date: "Apr 03, 2024",
      title:
        "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
      excerpt:
        "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing. It's like having a compass....",
    },
    {
      id: "4",
      date: "Mar 27, 2024",
      title: "A Small CAD for India, Yet Again",
      excerpt:
        "Yet again, India's Current Account Deficit is a mere 10 bn in the quarter (Dec 2023), much less than levels more than a decade back, and less than 2017-18 too. Why net of gold? It's not really a current account import...",
    },
    {
      id: "5",
      date: "Mar 25, 2024",
      title: "Poonawalla Fincorp: One right step at a time",
      excerpt:
        "There are some winning patterns in investing that keep repeating. One such pattern is when a big company buys a struggling company, fixes old problems, and brings in new leaders to grow the business. This way has often led to....",
    },
    {
      id: "6",
      date: "Mar 18, 2024",
      title:
        "CM Focused: Reducing our allocation to smallcaps & increasing cash",
      excerpt:
        "In the last few days, we have seen increased volatility in the mid and small-cap sectors due to consistent selling, including outright deliverable selling, by FIIs and some DIIs. While FIIs are selling to exit their existing positions and book...",
    },
  ],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
});

export default blogSlice.reducer;
