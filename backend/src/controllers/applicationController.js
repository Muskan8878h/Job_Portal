import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
    try {
        if(req.user.role !== "jobseeker"){
            return res.status(403).json({ message: "Only job seeker can apply" });
        }

        const existing = await Application.findOne({
            job: req.params.jobId,
            applicant: req.user._id,
        });

        if(existing){
            return res.status(404).json({ message: "Already applied to this job" });
        }

        const application = await Application.create({
            job: req.params.jobId,
            applicant: req.user._id,
            resume: req.user.resume,
        });

        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const apps = await Application.find({ applicant: req.user._id })
            .populate("job", "title company location type")
            .sort({ createdAt: -1 });

        res.json(apps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getApplicantsForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job || job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not Authorized to view applicants" });
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate("job", "title location category type")
            .populate("applicant", "name email avatar resume"); // <-- populate applicant here
        
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getApplicationById = async (req, res) => {
    try {
        const app = await Application.findById(req.params.id)
            .populate("job", "title")
            .populate("applicant", "name email avatar resume");

        if(!app){
            return res.status(404).json({ message: "Application not found.", id: req.params.id });
        }

        const isOwner = 
            app.applicant._id.toString() === req.user._id.toString() ||
            app.job.company.toString() === req.user._id.toString();
        
        if(!isOwner){
            return res.status(403).json({ message: "Not Authorized to view this application" });
        }

        res.json(app);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const app = await Application.findById(req.params.id).populate("job");

        if(!app || app.job.company.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "Not authorized to update this application" });
        }

        app.status = status;
        await app.save();

        res.json({ message: "Application status updated", status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};