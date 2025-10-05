import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RotateCcw } from "lucide-react";
import {
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const { trailingReturns, equityCurve } = useSelector(
    (state: RootState) => state.portfolio
  );

  // Get initial date range from data
  const initialFromDate =
    equityCurve.length > 0
      ? new Date(equityCurve[0].date)
      : new Date("2015-05-25");
  const initialToDate =
    equityCurve.length > 0
      ? new Date(equityCurve[equityCurve.length - 1].date)
      : new Date("2024-04-24");

  const [fromDate, setFromDate] = useState<Date | undefined>(initialFromDate);
  const [toDate, setToDate] = useState<Date | undefined>(initialToDate);

  // Filter equity curve data based on selected dates
  const filteredEquityCurve = useMemo(() => {
    if (!fromDate || !toDate) return equityCurve;

    return equityCurve.filter((point) => {
      const pointDate = new Date(point.date);
      return pointDate >= fromDate && pointDate <= toDate;
    });
  }, [equityCurve, fromDate, toDate]);

  // Reset dates to initial range
  const handleReset = () => {
    setFromDate(initialFromDate);
    setToDate(initialToDate);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Trailing Returns Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Trailing Returns</h2>
            <button className="p-2 hover:bg-accent rounded-md transition-colors cursor-pointer">
              <Download className="h-5 w-5 text-emerald-600" />
            </button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-sm text-muted-foreground">
                      <th className="text-left p-4 font-medium">NAME</th>
                      <th className="text-right p-4 font-medium">YTD</th>
                      <th className="text-right p-4 font-medium">1D</th>
                      <th className="text-right p-4 font-medium">1W</th>
                      <th className="text-right p-4 font-medium">1M</th>
                      <th className="text-right p-4 font-medium">3M</th>
                      <th className="text-right p-4 font-medium">6M</th>
                      <th className="text-right p-4 font-medium">1Y</th>
                      <th className="text-right p-4 font-medium">3Y</th>
                      <th className="text-right p-4 font-medium">SI</th>
                      <th className="text-right p-4 font-medium">DD</th>
                      <th className="text-right p-4 font-medium">MAXDD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trailingReturns.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-4 font-medium">{row.name}</td>
                        <td
                          className={`p-4 text-right ${
                            parseFloat(row.ytd) < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {row.ytd}
                        </td>
                        <td className="p-4 text-right">{row.oneD}</td>
                        <td className="p-4 text-right">{row.oneW}</td>
                        <td className="p-4 text-right">{row.oneM}</td>
                        <td className="p-4 text-right">{row.threeM}</td>
                        <td className="p-4 text-right">{row.sixM}</td>
                        <td className="p-4 text-right">{row.oneY}</td>
                        <td className="p-4 text-right">{row.threeY}</td>
                        <td className="p-4 text-right">{row.si}</td>
                        <td
                          className={`p-4 text-right ${
                            parseFloat(row.dd) < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {row.dd}
                        </td>
                        <td
                          className={`p-4 text-right ${
                            parseFloat(row.maxdd) < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {row.maxdd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 text-xs text-muted-foreground border-t">
                Note: Returns above 1 year are annualised.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Equity Curve Section */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">Equity curve</CardTitle>
                  <div className="flex text-sm text-muted-foreground">
                    Live since {equityCurve[0]?.date || "2015-05-25"} •{" "}
                    <button
                      onClick={handleReset}
                      className="flex items-center align-center gap-1 text-emerald-600 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="h-2 w-2 ml-1 mt-1.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">
                      From date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[200px] justify-start text-left font-normal text-sm h-9 cursor-pointer",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          {fromDate ? (
                            format(fromDate, "yyyy-mm-dd")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          disabled={(date) => {
                            const minDate = new Date(
                              equityCurve[0]?.date || "2015-05-25"
                            );
                            const maxDate =
                              toDate ||
                              new Date(
                                equityCurve[equityCurve.length - 1]?.date ||
                                  "2024-04-24"
                              );
                            return date < minDate || date > maxDate;
                          }}
                          initialFocus
                          className={cn(
                            "p-3 pointer-events-auto cursor-pointer"
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">
                      To date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[200px] justify-start text-left font-normal text-sm h-9 cursor-pointer",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          {toDate ? (
                            format(toDate, "yyyy-MM-dd")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          disabled={(date) => {
                            const minDate =
                              fromDate ||
                              new Date(equityCurve[0]?.date || "2015-05-25");
                            const maxDate = new Date(
                              equityCurve[equityCurve.length - 1]?.date ||
                                "2024-04-24"
                            );
                            return date < minDate || date > maxDate;
                          }}
                          initialFocus
                          className={cn(
                            "p-3 cursor-pointer pointer-events-auto"
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Equity Curve Chart */}
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={filteredEquityCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.getFullYear().toString();
                    }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    domain={[0, 350]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    domain={[-50, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === "Portfolio")
                        return [value.toFixed(2), "Focused"];
                      if (name === "Benchmark")
                        return [value.toFixed(2), "NIFTY50"];
                      if (name === "Drawdown")
                        return [value.toFixed(2) + "%", "Drawdown"];
                      return [value, name];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "14px" }}
                    formatter={(value) => {
                      if (value === "portfolio") return "Focused";
                      if (value === "benchmark") return "NIFTY50";
                      if (value === "drawdown") return "Drawdown";
                      return value;
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    name="Portfolio"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="Benchmark"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="drawdown"
                    fill="#fecaca"
                    stroke="#ef4444"
                    strokeWidth={1}
                    name="Drawdown"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
