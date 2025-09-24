import SavedJob from "../models/SavedJob.js";

export const saveJob = async (req, res) => {
    try {
        const exists = await SavedJob.findOne({ job: req.params.jobId, jobseeker: req.user._id });
        if(exists) return res.status(400).json({ message: "Job already saved" });

        const saved = await SavedJob.create({ job: req.params.jobId, jobseeker: req.user._id });
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: "Failed to save job", error: err.message });
    }
};

export const unsaveJob = async (req, res) => {
    try {
        await SavedJob.findOneAndDelete({ job: req.params.jobId, jobseeker: req.user._id });
        res.json({ message: "Job removed from saved list" });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove saved job", error: err.message });
    }
};

export const getMySavedJobs = async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({ jobseeker: req.user._id })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    select: "name companyName companyLogo",
                },
            });
        
        res.json(savedJobs);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch  job", error: err.message });
    }
};