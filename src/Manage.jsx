import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Manage = () => {
  const [students, setStudents] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/student/getall",
      );

      setStudents(response.data.students);
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const hadndleDelite = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/student/delete/${id}`);
      alert("Student Delete Successfully");
      fetchStudent();
    } catch (error) {
      console.error("Student Delete Error", error);
      alert("Student Delete Error");
    }
  };

  const filterData = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchParams.toLocaleLowerCase()) ||
      student.studentClass
        ?.toLowerCase()
        .includes(searchParams.toLocaleLowerCase()) ||
      student.batch?.toString().includes(searchParams),
  );

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 p-6 ml-64">
          <h2 className="text-xl mb-4">Manage Student</h2>
          <input
            type="text"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
            placeholder="Search by name and class"
            className="mb-2 border rounded p-2"
          />

          <table className="w-full">
            <thead>
              <tr className="text-left border-2 bg-gray-600">
                <th className="p-2">Name</th>
                <th className="p-2">Studen Class</th>
                <th className="p-2">Batch</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData.length > 0 ? (
                filterData.map((student) => (
                  <tr
                    key={student._id}
                    className="border-2 border-gray-700 hover:bg-gray-600"
                  >
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.studentClass}</td>
                    <td className="p-2">{student.batch}</td>
                    <td className="p-2 flex space-x-2">
                      <button
                        onClick={() => navigate(`/add?id=${student._id}`)}
                        className="text-yellow-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => hadndleDelite(student._id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Students Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manage;
