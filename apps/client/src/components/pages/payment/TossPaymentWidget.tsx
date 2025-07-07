'use client';
import { createOrderAction } from '@/actions/order/order-service';
import { PaymentType } from '@/types/reservationDataTypes';
import {
  CommonButton,
  PaddedLayout,
} from '@repo/ui/components/common/CommonLayouts';
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function generateRandomString() {
  if (typeof window !== 'undefined') {
    return window.btoa(Math.random().toString()).slice(0, 20);
  }
  return '';
}

interface Amount {
  currency: string;
  value: number;
}

export default function TossPaymentWidget({
  amount: paymentAmount,
  paymentType,
  userUuid,
}: {
  amount: number;
  paymentType: PaymentType;
  userUuid: string;
}) {
  const router = useRouter();
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
  const customerKey = userUuid;

  const [amount, setAmount] = useState<Amount>({
    currency: 'KRW',
    value: paymentAmount,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        // ------  SDK 초기화 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

        setWidgets(widgets);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      await widgets.setAmount(amount);

      // ------  결제 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
      await widgets.renderPaymentMethods({
        selector: '#payment-method',
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
        variantKey: 'DEFAULT',
      });

      // ------  이용약관 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
      await widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      setReady(true);
    }

    renderPaymentWidgets();
    // eslint-disable-next-line
  }, [widgets]);

  // const updateAmount = async (amount: Amount) => {
  //   setAmount(amount);
  //   await widgets!.setAmount(amount);
  // };

  const searchParams = useSearchParams();
  const reservationCode = searchParams.get('reservationCode');
  if (reservationCode === null) {
    router.push('/payment/fail');
    return;
  }

  return (
    <>
      <div className="box_section overflow-y-auto">
        <div id="payment-method" />
        <div id="agreement" />
        <PaddedLayout>
          <CommonButton
            className="mb-7"
            variant="secondary"
            disabled={!ready}
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
            onClick={async () => {
              try {
                const orderRes = await createOrderAction({
                  orderType: 'RESERVATION',
                  productCode: reservationCode,
                  amount: amount.value,
                  paymentType,
                });

                if (orderRes.success) {
                  await widgets!.requestPayment({
                    orderId: generateRandomString(),
                    orderName: '파크메이트 주차권',
                    successUrl:
                      window.location.origin +
                      `/payment/success?orderCode=${orderRes.data.orderCode}&reservationCode=${reservationCode}`,
                    failUrl: window.location.origin + '/payment/fail',
                    // customerEmail: 'customer123@gmail.com',
                    // customerName: '김토스',
                    // customerMobilePhone: '01012341234',
                  });
                }
              } catch (error) {
                // 에러 처리하기
                console.error(error);
                router.push('/payment/fail');
              }
            }}
          >
            결제하기
          </CommonButton>
        </PaddedLayout>
      </div>
    </>
  );
}
