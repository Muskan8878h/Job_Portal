import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layout/DashboardLayout1';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import CreateResumeForm from './CreateResumeForm';
import Modal from "../../components/Modal";
import { useAuth } from '../../context/AuthContext.jsx';

const DashBoard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [allResumes, setAllResumes] = useState([]);

  // ✅ Only fetch resumes if authenticated
  const fetchAllResumes = async () => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem('token'); // Auth token
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });

      setAllResumes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate('/login');
      }
    }
  };

  const createResume = async () => {
    if (!newTitle.trim()) return alert("Title is required!");

    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        API_PATHS.RESUME.CREATE,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewTitle("");
      setOpenCreateModal(false);
      fetchAllResumes();
    } catch (error) {
      console.error("Error creating resume:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p className="p-4">Please log in to view your resumes.</p>;

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
        <div
          className='h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer'
          onClick={() => setOpenCreateModal(true)}
        >
          <div className='w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl'>
            <LuCirclePlus className='text-xl text-purple-500' />
          </div>
          <h3 className='font-medium text-gray-800'>Add new Resume</h3>
        </div>

        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            imgUrl={resume?.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume?.updatedAt ? moment(resume.updatedAt).format("Do MMM YYYY") : ""
            }
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateResumeForm />
      </Modal>
    </DashboardLayout>
  );
};

export default DashBoard;
