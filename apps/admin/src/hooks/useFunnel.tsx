'use client';
import { ReactElement, ReactNode, useState } from 'react';

export const useFunnel = <T extends string>(initialStep: T) => {
  const [step, setStep] = useState<T>(initialStep);

  type StepProps = {
    name: T;
    children: ReactNode;
  };

  const Step = ({ children }: StepProps) => {
    return <>{children}</>;
  };

  type FunnelProps = {
    children: ReactElement<StepProps>[];
  };
  const Funnel = ({ children }: FunnelProps) => {
    const currentStep = children.find((child) => child.props.name === step);
    return <>{currentStep}</>;
  };
  Funnel.step = Step;

  return [Funnel, setStep] as const;
};
