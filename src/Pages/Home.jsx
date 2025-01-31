import React, { useEffect, useState } from "react";
import Preview from "./Preview";

export default function Home() {
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const today = formatDate(new Date());

    const [selectedDevice, setSelectedDevice] = useState("Device-1");
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [fromTime, setFromTime] = useState("01:00:00");
    const [toTime, setToTime] = useState("23:00:00");
    const [errors, setErrors] = useState({}); // State for validation errors
    const [filter,setFilter] = useState({selectedDevice:"Device-1",fromDate:today,toDate:today,fromTime:"01:00:00",toTime:"23:00:00"})
    const validateInputs = () => {
        const newErrors = {};

        // Validate dates
        const fromDateObj = new Date(fromDate.split("-").reverse().join("-"));
        const toDateObj = new Date(toDate.split("-").reverse().join("-"));

        if (fromDateObj > toDateObj) {
            newErrors.date = "From Date cannot be later than To Date.";
        }

        // Validate times
        if (fromTime > toTime) {
            newErrors.time = "From Time cannot be later than To Time.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleFilter = () => {
        if (validateInputs()) {
            localStorage.setItem("Device",selectedDevice)
          const data= {
            selectedDevice,fromDate,toDate,fromTime,toTime
          }
       

          setFilter(data)
        console.log(data)
        }
    };


    useEffect(()=>{
        localStorage.setItem("Device",selectedDevice)
    })

    return (
        <div style={styles.container}>
            {/* Buttons */}
          
            {/* Video Component */}
            <div style={styles.videoContainer}>
             <Preview filter={filter}/>

                {/* Dropdown and Inputs */}
                <div style={styles.controls}>
                    {/* Dropdown */}
                    <div style={styles.controlItem}>
                        <label style={styles.label} htmlFor="deviceSelect">
                            Select Device:
                        </label>
                        <select
                            id="deviceSelect"
                            value={selectedDevice}
                            onChange={(e) => setSelectedDevice(e.target.value)}
                            style={styles.select}
                        >
                            {/* <option value="Device-1">Device 1</option> */}
                            <option value="Device-1">Device 1 - Kochi Car</option>
                          
                        </select>
                    </div>

                    {/* Date Inputs */}
                    <div style={styles.controlItem}>
                        <label style={styles.label}>From Date:</label>
                        <input
                            type="date"
                            style={styles.input}
                            value={fromDate.split("-").reverse().join("-")}
                            onChange={(e) => setFromDate(formatDate(e.target.value))}
                        />
                        {errors.date && <p style={styles.error}>{errors.date}</p>}

                        <label style={styles.label}>To Date:</label>
                        <input
                            type="date"
                            style={styles.input}
                            value={toDate.split("-").reverse().join("-")}
                            onChange={(e) => setToDate(formatDate(e.target.value))}
                        />
                    </div>

                    {/* Time Inputs */}
                    <div style={styles.controlItem}>
                        <label style={styles.label}>From Time:</label>
                        <input
                            type="time"
                            style={styles.input}
                            value={fromTime}
                            step="1"
                            onChange={(e) => setFromTime(e.target.value)}
                        />
                        {errors.time && <p style={styles.error}>{errors.time}</p>}

                        <label style={styles.label}>To Time:</label>
                        <input
                            type="time"
                            style={styles.input}
                            value={toTime}
                            step="1"
                            onChange={(e) => setToTime(e.target.value)}
                        />
                    </div>

                    {/* Filter Button */}
                    <div style={styles.controlItem}>
                        <button style={styles.filterButton} onClick={handleFilter}>
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    videoContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: "800px",
    },
    video: {
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#000",
    },
    controls: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        margin:"50px 80px"
    },
    controlItem: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width:"200px"
    },
    label: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
    },
    select: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    filterButton: {
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
};
