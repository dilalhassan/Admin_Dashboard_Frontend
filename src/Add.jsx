import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    studentClass: "",
    batch: "",
    gender: "",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const studentId = searchParams.get("id");

  useEffect(() => {
    if (studentId) {
      fetchStudentData(studentId);
    }
  }, [studentId]);

  const fetchStudentData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/student/${id}`,
      );
      setStudentData(response.data.student);
    } catch (error) {
      console.error("Updating data error...");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/v1/student/create",
      studentData,
    );
    navigate("/manage");
    console.log(studentData);
    console.log(response.data.student);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <h2 className="text-lg mb-4">
          {studentId ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit} className=" space-y-4">
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            placeholder="Entur your name"
            className="w-full rounded border p-3 cursor-pointer focus:ring-2 focus:outline-none transition duration-300"
          />
          <input
            type="text"
            name="studentClass"
            value={studentData.studentClass}
            onChange={handleChange}
            placeholder="Entur your Class"
            className="w-full rounded border p-3 cursor-pointer focus:ring-2 focus:outline-none transition duration-300"
          />
          <input
            type="text"
            name="batch"
            value={studentData.batch}
            onChange={handleChange}
            placeholder="Entur your Batch"
            className="w-full rounded border p-3 cursor-pointer focus:ring-2 focus:outline-none transition duration-300"
          />
          <select
            className="w-full bg-gray-700 text-white"
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            type="submit"
            className="p-3 bg-blue-500 text-center rounded font-bold hover:bg-blue-800 transition duration-300"
          >
            {studentId ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
