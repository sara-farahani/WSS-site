'use client';

import { useCallback, useEffect, useState } from 'react';
import ProfileCompletionWarning from './ProfileCompletionWarning';
import Workshops from './Workshops';
import AttendanceInfo from './AttendanceInfo';
import { ModeOfAttendance, Workshop } from '../../../lib/types';
import { fetchPrice } from '../../../lib/api/dashboard/register';
import { createPayment } from '../../../lib/api/dashboard/payment';

export default function RegisterForm({
  workshops,
  modesOfAttendance,
  profileNationalCode,
  isProfileComplete,
}: {
  workshops: Workshop[];
  modesOfAttendance: ModeOfAttendance[];
  profileNationalCode?: string;
  isProfileComplete: boolean;
}) {
  const [error, setError] = useState('');
  const [price, setPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountCodeValid, setDiscountCodeValid] = useState(true);
  const [nationalCode, setNationalCode] = useState(profileNationalCode);
  const [selectedPlans, setSelectedPlans] = useState<number[]>(
    workshops
      .filter((workshop) => workshop.paid)
      .map((workshop) => workshop.id),
  );

  const selectPlan = useCallback(async (planId: number) => {
    setSelectedPlans((selectedPlans) => [...selectedPlans, planId]);
  }, []);

  const removePlan = useCallback(async (planId: number) => {
    setSelectedPlans((selectedPlans) =>
      selectedPlans.filter((selectedPlanId) => selectedPlanId !== planId),
    );
  }, []);

  const updatePrice = useCallback(async () => {
    if (!selectedPlans || !selectedPlans.length) {
      setPrice(0);
      return;
    }
    const {
      price: { calculatedPrice },
      isDiscountCodeValid,
      error,
    } = await fetchPrice(selectedPlans, discountCode);
    if (!isDiscountCodeValid) {
      setDiscountCodeValid(false);
      return;
    }
    setDiscountCodeValid(true);
    setPrice(calculatedPrice);
  }, [discountCode, selectedPlans]);

  useEffect(() => {
    const doUpdatePrice = async () => {
      await updatePrice();
    };

    doUpdatePrice();
  }, [updatePrice]);

  const onCheckoutClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    setError('');

    const response = await createPayment({
      plans: selectedPlans,
      discountCode,
    });

    if (response.error) {
      setError(response.error);
    }
  };

  return (
    <>
      {!isProfileComplete && <ProfileCompletionWarning />}
      <div className={'flex w-full flex-col'}>
        {error && (
          <p className="w-full rounded-md bg-red-50 p-3 font-medium text-red-600">
            {error}
          </p>
        )}
        <div
          className={
            'py-4 text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Workshops
        </div>
        <Workshops
          workshops={workshops}
          selectPlan={selectPlan}
          removePlan={removePlan}
        />
      </div>
      <div className={'flex w-full flex-col'}>
        <div
          className={
            'text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Attendance Info
        </div>
        <AttendanceInfo
          modesOfAttendance={modesOfAttendance}
          selectPlan={selectPlan}
          removePlan={removePlan}
          nationalCode={nationalCode}
          setNationalCode={setNationalCode}
          price={price}
          updatePrice={updatePrice}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          isDiscountCodeValid={isDiscountCodeValid}
          setDiscountCodeValid={setDiscountCodeValid}
        />

        <button
          className={
            'mt-14 w-full rounded-lg bg-secondary py-6 text-xl font-bold text-white'
          }
          onClick={onCheckoutClick}
        >
          Checkout
        </button>
      </div>
    </>
  );
}
