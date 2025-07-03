export const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

/**
 * 전화번호 문자열을 자동으로 하이픈(-) 포함 형식으로 변환하고,
 * 백스페이스 입력 시 하이픈 제거를 처리합니다.
 * @param inputValue 현재 입력 필드의 값 (하이픈 포함 가능성 있음)
 * @param inputType InputEvent의 inputType ('deleteContentBackward' 등)
 * @param selectionStart 커서의 현재 위치 (선택적으로 백스페이스 처리 시 필요)
 * @returns 포맷팅된 전화번호 문자열
 */
export const formatPhoneNumber = (
  inputValue: string,
  inputType?: string,
  selectionStart?: number
): string => {
  const rawValue = inputValue.replace(/[^\d]/g, '');
  let formattedValue = rawValue;

  if (rawValue.length > 6) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(
      3,
      7
    )}-${rawValue.slice(7, 11)}`;
  } else if (rawValue.length > 3) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}`;
  }

  if (inputType === 'deleteContentBackward' && selectionStart !== undefined) {
    if (formattedValue[selectionStart - 1] === '-') {
      formattedValue =
        formattedValue.slice(0, selectionStart - 1) +
        formattedValue.slice(selectionStart);
    }
  }

  return formattedValue;
};
