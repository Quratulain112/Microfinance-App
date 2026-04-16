import { useState, useMemo } from 'react';

export const useLoanCalculator = () => {
    const [category, setCategory] = useState("Wedding Loans");
    const [amount, setAmount] = useState(100000);
    const [period, setPeriod] = useState(3);
    const [deposit, setDeposit] = useState(10000);

    // Logic: (Total - Deposit) / (Years * 12)
    const monthlyInstallment = useMemo(() => {
        const principal = amount - deposit;
        const months = period * 12;
        return principal > 0 ? Math.round(principal / months) : 0;
    }, [amount, deposit, period]);

    return {
        category, setCategory,
        amount, setAmount,
        period, setPeriod,
        deposit, setDeposit,
        monthlyInstallment
    };
};