import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const PieChart = ({ label, data }) => {
    return (
        <div>  
            <Pie
                data={{
                    labels: label,
                    datasets: [
                        {
                            label: "Last 7 days users",
                            data: data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgb(255, 0, 0,0.2)",
                                "rgb(0, 0, 255, 0.2)",
                                "rgb(60, 179, 113, 0.2)",
                                "rgb(238, 130, 238, 0.2)",
                                "rgb(255, 165, 0, 0.2)",
                                "rgb(106, 90, 205, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}
            />
            <b className="mx-9 text-center "><h4>Last 7 days new users</h4></b>
        </div>
    );
};

export default PieChart;
