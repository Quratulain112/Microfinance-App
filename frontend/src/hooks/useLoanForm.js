import { useState } from 'react';
import { toast } from 'react-toastify';
import { submitLoanRequest } from '../api/loanService';

export const useLoanForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        subcategory: '',
        amount: '',
        loanPeriod: '',
        personalInfo: { 
            address: '', 
            phone: '',
            occupation: '',
            monthlyIncome: '',
            monthlyExpenses: ''
        },
        guarantors: [
            { name: '', email: '', location: '', cnic: '' },
            { name: '', email: '', location: '', cnic: '' }
        ]
    });

    const updateFields = (fields) => setFormData(prev => ({ ...prev, ...fields }));

    const updatePersonal = (field, value) => setFormData(prev => ({
        ...prev, personalInfo: { ...prev.personalInfo, [field]: value }
    }));

    const updateGuarantor = (index, field, value) => {
        const newGuarantors = [...formData.guarantors];
        newGuarantors[index] = { ...newGuarantors[index], [field]: value };
        setFormData(prev => ({ ...prev, guarantors: newGuarantors }));
    };

    // Backend Submission Logic with LocalStorage
    const handleFinalSubmit = async (onSuccess) => {
        try {
            setIsSubmitting(true);
            const response = await submitLoanRequest(formData);

            if (response.status === 201) {
                const loanData = response.data.loanRequest;

                localStorage.setItem('activeLoan', JSON.stringify(loanData));

                toast.success(response.data.message || "Request submitted!");

                if (onSuccess) onSuccess(loanData);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Submission failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        step, setStep, formData, isSubmitting,
        updateFields, updatePersonal, updateGuarantor, handleFinalSubmit
    };
};