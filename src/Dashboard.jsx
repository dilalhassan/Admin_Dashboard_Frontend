import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell} from 'recharts'
import axios from 'axios';

const Dashboard = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
      fetchStudent();
    }, []);

    const fetchStudent = async () => {
        const response = await axios.get("https://admin-dashboard-backend-xcxm.onrender.com/api/v1/student/getall");
        setStudents(response.data.students);
    }

    const totalStudents = students.length;

    const batchData = students.reduce((dcc, s) => {
        const batch = s.batchYear;
        dcc[batch]=(dcc[batch] || 0) + 1;
        return dcc;
    },{});

    const batchChartData = Object.keys(batchData).map((year) =>({
        batchYear:year,
        students:batchData[year]
    }));

    const genderData = [
        {name:"Male",value:students.filter((s) => s.gender === "Male").length},
        {name:"Female",value:students.filter((s) => s.gender === "Female").length}
    ];

    const COLLORS = ["#4f46e5", "#e53e3e"];

    const classData = students.reduce((acc,s) => {
        const studentClass = s.studentClass;
        acc[studentClass] = (acc[studentClass] || 0) + 1;
        return acc;
    },{})

    const classChartData = Object.keys(classData).map((cls) =>({
        className:cls,
        students:classData[cls]
    }))
    

  return (
    <>
        <div className='flex bg-gray-900 text-white'>
            <Sidebar />
            <div className='flex-1 ml-64 p-6'>
                <h2 className='text-2xl font-bold mb-6'>Student Dashboard</h2>
                <div className='grid grid-cols-3 gap-6 mb-6'>
                    <div className='bg-gray-800 p-4 rounded-lg text-center'>
                        <h3 className='text-lg font-bold'>Total Students</h3>
                        <p className='text-3xl font-bold'>{totalStudents}</p>
                    </div>
                    <div className='bg-gray-800 p-4 rounded-lg text-center'>
                        <h3 className='text-lg font-bold'>Male Students</h3>
                        <p className='text-3xl font-bold'>{genderData[0].value}</p>
                    </div>
                    <div className='bg-gray-800 p-4 rounded-lg text-center'>
                        <h3 className='text-lg font-bold'>Female Students</h3>
                        <p className='text-3xl font-bold'>{genderData[1].value}</p>
                    </div>
                    
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='bg-gray-800 p-4 rounded-lg'>
                        <h3 className='mb-4 font-bold'>Students Per Batch</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={batchChartData}>
                                <XAxis dataKey="batchYear"></XAxis>
                                <YAxis></YAxis>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="students" fill='#4f46e5'></Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='bg-gray-800 p-4 rounded-lg'>
                        <h3 className='mb-4 font-bold'>Gender Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={genderData} dataKey="value" outerRadius={80} label >
                                    {genderData.map((entry, idx) =>(
                                        <Cell key={`cell-${idx}`} fill={COLLORS[idx]}></Cell>
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                     <div className='bg-gray-800 p-4 rounded-lg'>
                        <h3 className='mb-4 font-bold'>Student Per Class</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={classChartData}>
                                {/* <XAxis dataKey={className}></XAxis> */}
                                <XAxis dataKey="className" />
                                <YAxis></YAxis>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="students" fill='#10b981'></Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                     <div className='bg-gray-800 p-4 rounded-lg'>
                        <h3 className='mb-4 font-bold'>Resent Students</h3>
                        <table className='w-full'>
                            <thead>
                                <tr className='border border-gray-700 bg-gray-500'>
                                    <th className='p-2 text-left'>Name</th>
                                    <th className='p-2 text-left'>Class</th>
                                    <th className='p-2 text-left'>Batch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.slice(-5).map((student)=>(
                                        <tr key={student._id} className='border border-gray-700'>
                                            <td className='p-2'>{student.name}</td>
                                            <td className='p-2'>{student.studentClass}</td>
                                            <td className='p-2'>{student.batch}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard