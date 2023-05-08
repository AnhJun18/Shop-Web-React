import React, { useState } from "react";
import adminLayout from "../admin/adminLayout"
import Chart from 'react-apexcharts'
import { useEffect } from "react";
import axios from "../api/axios";
import axiosApiInstance from "../context/interceptor";


const DashboardPage = () => {
  const [monthTitle, setMonthTitle] = useState([]);
  const [dataRevenue, setData] = useState([]);
  const [arrayYear, setYear] = useState([])
  const [yearSelected, setYearSelected] = useState('2023')
  const setFiveYear = () => {
    const currentYear = new Date().getFullYear();
    setYearSelected(currentYear);
    let years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    setYear(years);
  }

  const getData = async () => {
    const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/product/test?year=${yearSelected}`);
    setMonthTitle(result.data.map((item) => {
      return 'T' + item["Thang"]
    }
    ))
    setData(result.data.map((item) =>
      item["DoanhThu"]
    ))
  }
  const handleChangeYear = (e) => {
    setYearSelected(e.target.value)
  }
  useEffect(() => {
    setFiveYear();
  }, [])

  useEffect(() => {
    getData()
  }, [yearSelected])
  const Sitting = {
    options: {
      chart: {
        id: 'apexchart-example'
      },
      dataLabels: {
        enabled: false
      }, stroke: {
        curve: 'straight'
      }, title: {
        text: 'Thống kê doanh thu',
        align: 'left'
      },
      subtitle: {
        text: `Năm ${yearSelected}`,
        align: 'left'
      },
      xaxis: {
        categories: monthTitle
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
    series: [{
      name: 'Doanh Thu',
      data: dataRevenue
    }]
  }


  return (

    <>
      <div className="row" style={{ padding: 80 }}>
        <select className="form-control" id="statusChoose" onChange={handleChangeYear}>
          <option value={arrayYear?.at(0)}>{arrayYear?.at(0)}</option>
          {arrayYear?.map((y) => (
            <option value={y} key={y}>{y}</option>
          ))}
        </select>
        <Chart options={Sitting.options} series={Sitting.series} type="area" height={320} />
      </div>
    </>
  )

}
export default adminLayout(DashboardPage);