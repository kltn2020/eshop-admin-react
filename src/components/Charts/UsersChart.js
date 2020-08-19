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
import { userActions } from "../../actions";

export default function UsersChart() {
  const theme = useTheme();

  //Redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  //>>Load all users
  useEffect(() => {
    //dispatch(userActions.getAll(`?limit=500`));
  }, [dispatch]);

  //User chart Data
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (users.items && users.items.length > 0) {
      //Functions get past 7 days
      const dates = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setUTCHours(0, 0, 0, 0);
        return d;
      });

      //Funtion to get date outside user and format it
      const pyDates = [...users.items].map((user, index) => {
        const d = new Date(user.created_at);
        d.setUTCHours(0, 0, 0, 0);

        return { date: d, user: user };
      });

      //Function to compare and count
      //1.Create new array
      //2.Map past 7 days, if user day = 1 day in this array, count +1
      //3.Push data of day to newArray
      //4.When run through 7 days complete, setUserData for chart with newArray
      let newArray = [];
      dates.map((day) => {
        let count = 0;
        pyDates.map((userDay) => {
          if (userDay.date.getTime() === day.getTime()) {
            return count++;
          } else return count;
        });
        return newArray.push({
          day: day.toLocaleDateString(),
          newUser: count,
        });
      });
      setUserData(newArray.reverse());
    }
  }, [users.items]);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <AreaChart
          data={userData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <defs>
            <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
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
              New Users
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="newUser"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorUser)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
