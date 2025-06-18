import { useFormContext, useWatch } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

export function useStepValidation<TFormValues extends FieldValues>(
  fieldsToValidate: readonly FieldPath<TFormValues>[]
) {
  const { trigger, control } = useFormContext<TFormValues>();
  const [isStepValid, setIsStepValid] = useState(false);

  const watchedFields = useWatch({
    control,
    name: fieldsToValidate,
  });

  const triggerValidation = useCallback(async () => {
    const result = await trigger([...fieldsToValidate]);
    setIsStepValid(result);
    return result;
  }, [fieldsToValidate, trigger]);

  useEffect(() => {
    triggerValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...watchedFields]);

  return { isStepValid, triggerValidation };
}
