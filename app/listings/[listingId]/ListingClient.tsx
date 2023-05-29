//it should be in components folder
//but in nextjs 13 components can be outside
//components folder

'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};


interface ListingClientProps {
    reservations?: SafeReservation[];

    // listing also includes user as per our return value of listing
    listing: SafeListing & {
      user: SafeUser;
    };
    currentUser?: SafeUser | null;
  }
  

  const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
  }) => {

    const loginModal = useLoginModal();
    const router = useRouter();


    //if there is already a reservation for this listing
    //we need to disable those dates
    const disabledDates = useMemo(() => {
      let dates: Date[] = [];
  
      reservations.forEach((reservation: any) => {
        const range = eachDayOfInterval({
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate)
        });
  
        dates = [...dates, ...range];
      });
  
      return dates;
    }, [reservations]);

    //database has only category value
    //we need icon also
    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
     }, [listing.category]);


     const [isLoading, setIsLoading] = useState(false);
     const [totalPrice, setTotalPrice] = useState(listing.price);
     const [dateRange, setDateRange] = useState<Range>(initialDateRange);


     const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        //router.push('/trips');
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);


  //set total price based on no. of days of booking
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      //differenceInDays will ignore couple of hours difference
      const dayCount = differenceInCalendarDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

     return ( 
        <Container>
          <div 
            className="
              max-w-screen-lg 
              mx-auto
            "
          >
            <div className="flex flex-col gap-6">
              <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={currentUser}
              />

               {/* 7 column grid ; 4 columns for listing info and
               3 columns for listing reservation
               in sizes less than md one column grid  */}
              <div 
                className="
                  grid 
                  grid-cols-1 
                  md:grid-cols-7 
                  md:gap-10 
                  mt-6
                "
              >
                <ListingInfo
                  user={listing.user}
                  category={category}
                  description={listing.description}
                  roomCount={listing.roomCount}
                  guestCount={listing.guestCount}
                  bathroomCount={listing.bathroomCount}
                  locationValue={listing.locationValue}
                />
                <div 
                  className="
                    order-first 
                    mb-10 
                    md:order-last 
                    md:col-span-3
                  "
                >
                  <ListingReservation
                    price={listing.price}
                    totalPrice={totalPrice}
                    onChangeDate={(value) => setDateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledDates={disabledDates}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
       );
}

export default ListingClient;