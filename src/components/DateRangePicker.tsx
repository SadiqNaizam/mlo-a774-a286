"use client"

import * as React from "react"
import { addDays, format, startOfMonth, startOfYear, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ className, onDateChange }: DateRangePickerProps) {
  console.log('DateRangePicker loaded');

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  })

  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);
  
  const setPresetRange = (range: '7d' | '30d' | 'month' | 'year') => {
    const now = new Date();
    let fromDate: Date;
    switch(range) {
      case '7d':
        fromDate = subDays(now, 6);
        break;
      case '30d':
        fromDate = subDays(now, 29);
        break;
      case 'month':
        fromDate = startOfMonth(now);
        break;
      case 'year':
        fromDate = startOfYear(now);
        break;
    }
    setDate({ from: fromDate, to: now });
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="start">
            <div className="flex flex-col space-y-2 border-r p-4">
                <Button variant="ghost" className="justify-start" onClick={() => setPresetRange('7d')}>Last 7 Days</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPresetRange('30d')}>Last 30 Days</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPresetRange('month')}>This Month</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setPresetRange('year')}>This Year</Button>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangePicker;