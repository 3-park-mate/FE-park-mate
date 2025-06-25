import { handleKeyDown } from '@/utils/formUtils';
import { Button } from '@repo/ui/components/base/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';

export default function ReservationCancelDialog({
  parkingLotName,
}: {
  parkingLotName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-white border border-red-1 text-red-1 h-10">
          예약취소
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>예약 취소</DialogTitle>
          <p className="text-15px text-gray-2">{parkingLotName}</p>
        </DialogHeader>
        <form
          // onSubmit={handleSubmit(onSubmitHandler)}
          className="space-y-4 mt-4"
          onKeyDown={handleKeyDown}
        >
          <CommonInputWithLabel
            label="취소 사유"
            type="text"
            maxLength={50}
            placeholder="취소 사유를 작성해 주세요. (최대 50자)"
            description="예약이 시작되기 전까지 결제를 취소할 수 있으며, 환불까지 1~2일 소요될 수 있습니다."
            // {...register('discountRate')}
          />
          <DialogFooter className="mt-10">
            <Button
              type="submit"
              className="flex-1 bg-white border border-red-1 text-red-1 h-10"
            >
              예약 취소 요청
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
