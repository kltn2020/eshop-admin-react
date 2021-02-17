import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

//Redux
import { useDispatch, useSelector } from "react-redux";

export default function ReviewsChart() {
  const theme = useTheme();

  //Redux
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  //>>Load all reviews
  useEffect(() => {
    //dispatch(reviewActions.getAll(`?limit=500`));
  }, [dispatch]);

  //Review chart Data
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    if (reviews.items && reviews.items.length > 0) {
      //Functions get past 7 days
      const dates = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setUTCHours(0, 0, 0, 0);
        return d;
      });

      //Funtion to get date outside review and format it
      const pyDates = [...reviews.items].map((review, index) => {
        const d = new Date(review.review_date);
        d.setUTCHours(0, 0, 0, 0);

        return { date: d, review: review };
      });

      //Function to compare and count
      //1.Create new array
      //2.Map past 7 days, if review day = 1 day in this array, count +1
      //3.Push data of day to newArray
      //4.When run through 7 days complete, setReviewData for chart with newArray
      let newArray = [];
      dates.map((day) => {
        let count = 0;
        pyDates.map((reviewDay) => {
          if (reviewDay.date.getTime() === day.getTime()) {
            return count++;
          } else return count;
        });
        return newArray.push({
          day: day.toLocaleDateString(),
          numberOfReviews: count,
        });
      });
      setReviewData(newArray.reverse());
    }
  }, [reviews.items]);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <AreaChart
          data={reviewData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <defs>
            <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              New Reviews
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="numberOfReviews"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorReview)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
