import LoanRequest from "../models/loanRequest.js";

export const submitLoanRequest = async (req, res) => {
    try {
        const { category, subcategory, amount, loanPeriod, guarantors, personalInfo } = req.body;

        if (!category || !subcategory || !amount || !loanPeriod || !guarantors || !personalInfo) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const monthlyInstallment = amount / (loanPeriod * 12); 
        const netSavings = personalInfo.monthlyIncome - personalInfo.monthlyExpenses;

        if (monthlyInstallment > netSavings) {
            return res.status(400).json({
                message: "Aapki mahana aamdani aur kharchon ke mutabiq ye qist zyada hai. Baraye meherbani loan ki raqam kam karein ya muddat barha dein."
            });
        }

        const tokenNumber = "SAY-" + Math.random().toString(36).toUpperCase().slice(-6);

        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + 7);

        const newLoanRequest = await LoanRequest.create({
            user: req.user.id,
            category,
            subcategory,
            amount,
            loanPeriod,
            guarantors, // Array of 2 guarantors
            personalInfo, 
            appointment: {
                tokenNumber,
                date: appointmentDate,
                time: "10:00 AM", // Default time slot
                location: "Saylani Head Office"
            }
        });

        res.status(201).json({
            message: "Loan request submitted successfully!",
            loanRequest: newLoanRequest
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyLoans = async (req, res) => {
    try {
        const loans = await LoanRequest.find({ user: req.user.id });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};