'use client';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ParkingCarousel from '@/components/common/ParkingCarousel';
import { useLocationStore } from '@/store/useLocationStore';
import { getParkingLotsInBox } from '@/actions/parking/parking-service';
import { getReviewSummaryData } from '@/actions/review/review-service';
import { ParkingLotSimpleInfoWithRatingType } from '@/types/mapDataTypes';
import ParkingCarouselSkeleton from '@/components/common/ParkingCarouselSkeleton';

function getBoundingBox(
  lat: number,
  lng: number,
  radiusInMeters: number = 500
) {
  const R = 111000;
  const deltaLat = radiusInMeters / R;
  const deltaLng = radiusInMeters / (R * Math.cos((lat * Math.PI) / 180));

  return {
    swLat: lat - deltaLat,
    swLng: lng - deltaLng,
    neLat: lat + deltaLat,
    neLng: lng + deltaLng,
  };
}

export default function NearestParking() {
  const { latitude, longitude } = useLocationStore();
  const [carouselDatasWithRating, setCarouselDatasWithRating] = useState<
    ParkingLotSimpleInfoWithRatingType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParkingAndRatings = async () => {
      if (latitude == null || longitude == null) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const box = getBoundingBox(latitude, longitude, 1000);

      try {
        const parkingRes = await getParkingLotsInBox({
          ...box,
          isEvChargingAvailable: false,
        });

        const parkingLots = parkingRes.parkingLots;

        const parkingLotsWithRatings = await Promise.all(
          parkingLots.map(async (parkingLot) => {
            try {
              const reviewSummaryRes = await getReviewSummaryData(
                parkingLot.parkingLotUuid
              );
              const rating =
                reviewSummaryRes.success && reviewSummaryRes.data
                  ? reviewSummaryRes.data.averageRating
                  : 0;

              return {
                ...parkingLot,
                rating: rating,
              };
            } catch (err) {
              console.error(
                `Failed to load review for ${parkingLot.name}:`,
                err
              );
              return {
                ...parkingLot,
                rating: 0,
              };
            }
          })
        );
        setCarouselDatasWithRating(parkingLotsWithRatings);
      } catch (err) {
        console.error('Failed to load parking lots or reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingAndRatings();
  }, [latitude, longitude]);

  return (
    <section className="pl-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold py-4">
          주변 주차장을 둘러보세요.
        </h2>
        <Link href="#" className="mr-6">
          <p className="flex items-center gap-0.5 text-13px text-gray-2">
            전체보기
            <ChevronRight size={14} />
          </p>
        </Link>
      </div>

      {isLoading ? (
        <ParkingCarouselSkeleton />
      ) : (
        <ParkingCarousel carouselDatas={carouselDatasWithRating} />
      )}
    </section>
  );
}
