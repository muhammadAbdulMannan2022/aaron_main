import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Modal } from "../../../../helpers/Modal";
import ProcessVariantsModal from "./VarientOptions";
import { useGetProcessVarientQuery } from "../../../../../redux/api/dashboard";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function MainFilterDashboard({
  onClose,
  selectedDateRange,
  setSelectedDateRange,
  selectedVarients,
  setSelectedVarients,
  cycleTime,
  setCycleTime,
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2021, 5)); // June 2021
  const [selectedDates, setSelectedDates] = useState([]); // Store dates as YYYY-MM-DD strings
  const [minCycleTime, setMinCycleTime] = useState("");
  const [maxCycleTime, setMaxCycleTime] = useState("");
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const projectId = localStorage.getItem("currentProjectId");

  const { data: varientData, isLoading } = useGetProcessVarientQuery(
    projectId,
    {
      skip: !projectId,
    }
  );

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++)
      days.push(new Date(year, month, day));
    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    const formattedDate = formatDate(date);
    return selectedDates.includes(formattedDate);
  };

  const isDateInRange = (date) => {
    if (!date || selectedDates.length !== 2) return false;
    const [start, end] = [...selectedDates].sort();
    const formattedDate = formatDate(date);
    return formattedDate >= start && formattedDate <= end;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const formattedDate = formatDate(date);
    const isSelected = isDateSelected(date);
    if (isSelected) {
      setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
    } else {
      if (selectedDates.length === 0) {
        setSelectedDates([formattedDate]);
      } else if (selectedDates.length === 1) {
        setSelectedDates([...selectedDates, formattedDate]);
      } else {
        setSelectedDates([formattedDate]);
      }
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === "prev") newDate.setMonth(newDate.getMonth() - 1);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleApply = () => {
    setSelectedDateRange(selectedDates);
    setCycleTime([minCycleTime, maxCycleTime]);
    onClose();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl text-center text-white">Filter Options</h1>
      <div>
        <div className="flex items-center justify-between mb-4 text-gray-300">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 hover:bg-gray-700 rounded hover:cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 hover:bg-gray-700 rounded hover:cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium py-2"
              style={{ color: "var(--color-text-notActive)" }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && handleDateClick(date)}
              disabled={!date}
              className={`
                aspect-square flex items-center justify-center text-sm rounded
                ${!date ? "invisible" : "hover:bg-gray-700"}
                ${
                  date && (isDateSelected(date) || isDateInRange(date))
                    ? "bg-auth-button-bg text-white"
                    : "text-gray-300"
                }
              `}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-text-primary">
          Select Process variants (Max 5)
        </h3>
        <div className="mb-3">
          <button
            onClick={() => setVariantModalOpen(true)}
            className="text-xs flex items-center gap-2 bg-gray-button-bg text-text-primary px-3 py-2 hover:cursor-pointer"
          >
            Select variants
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Case Filter</h3>
        <div className="space-y-3">
          <div>
            <label
              className="block text-xs mb-3"
              style={{ color: "var(--color-text-notActive)" }}
            >
              Cycle time (Min - Max) in Hours
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Ex. 1"
                value={minCycleTime}
                onChange={(e) => setMinCycleTime(e.target.value)}
                className="bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded px-2 py-1"
              />
              <input
                value={maxCycleTime}
                onChange={(e) => setMaxCycleTime(e.target.value)}
                placeholder="Ex. 30"
                className="bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="w-full text-white font-medium rounded py-2 hover:cursor-pointer"
        style={{ backgroundColor: "var(--color-auth-button-bg)" }}
      >
        Apply
      </button>
      <Modal
        isOpen={variantModalOpen}
        onClose={() => setVariantModalOpen(false)}
      >
        <ProcessVariantsModal
          data={isLoading ? [] : varientData.variants}
          selectedVarients={selectedVarients}
          setSelectedVarients={setSelectedVarients}
          onClose={() => setVariantModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
