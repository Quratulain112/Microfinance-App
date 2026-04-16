import { useState, useEffect } from 'react';
import { getMyLoanRequest } from '../api/loanService';

export const useDashboard = () => {
    const [status, setStatus] = useState('loading');
    const [loanData, setLoanData] = useState(null);

    const fetchStatus = async () => {
        try {
            const response = await getMyLoanRequest();
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                const latestLoan = response.data[0];
                setLoanData(latestLoan);
                setStatus(latestLoan.status.toLowerCase());
                localStorage.setItem('activeLoan', JSON.stringify(latestLoan));
            } else {
                setStatus('new');
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setStatus('new');
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleSuccess = (data) => {
        setLoanData(data);
        setStatus(data.status?.toLowerCase() || 'pending');
        localStorage.setItem('activeLoan', JSON.stringify(data));
    };

    const resetToNew = () => setStatus('new');

    return {
        status,
        loanData,
        handleSuccess,
        resetToNew,
        isLoading: status === 'loading'
    };
};