import { useLocationAlertStore } from '@/store/useLocationAlertStore';
import AlertModal from '@repo/ui/components/common/AlertModal';

export default function LocationPermissionModal() {
  const { openAlert, setOpenAlert } = useLocationAlertStore();
  return (
    <AlertModal
      open={openAlert}
      onOpenChange={setOpenAlert}
      errorMessage={'위치 접근 권한을 허용해주세요'}
      theme="primary"
    />
  );
}
