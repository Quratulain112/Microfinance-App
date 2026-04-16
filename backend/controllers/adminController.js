import LoanRequest from "../models/loanRequest.js";

export const getAllApplications = async (req, res) => {
    try {
        const { status, category } = req.query;
        let query = {};

        if (status) query.status = status;
        if (category) query.category = category;

        const applications = await LoanRequest.find(query)
            .populate('user', 'name email cnic')
            .sort({ createdAt: -1 });

        const enrichedApplications = applications.map(app => {
            const monthlyInstallment = app.amount / (app.loanPeriod * 12);
            const savings = app.personalInfo.monthlyIncome - app.personalInfo.monthlyExpenses;

            // DBR Calculation
            const dbr = (monthlyInstallment / app.personalInfo.monthlyIncome) * 100;

            let riskLevel = "Low";
            if (dbr > 50) riskLevel = "High";
            else if (dbr > 35) riskLevel = "Medium";

            return {
                ...app._doc,
                calculatedMetrics: {
                    monthlyInstallment: Math.round(monthlyInstallment),
                    dbr: dbr.toFixed(2) + "%",
                    riskLevel,
                    repaymentCapacity: savings > monthlyInstallment ? "Sufficient" : "Insufficient"
                }
            };
        });

        res.status(200).json(enrichedApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, appointmentDate, appointmentTime, location } = req.body;

        const application = await LoanRequest.findById(id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status || application.status;

        if (status === 'Approved') {
            if (appointmentDate) application.appointment.date = appointmentDate;
            if (appointmentTime) application.appointment.time = appointmentTime;
            if (location) application.appointment.location = location;
        }

        const updatedApp = await application.save();

        res.status(200).json({
            message: `Application status updated to ${status}`,
            data: updatedApp
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};