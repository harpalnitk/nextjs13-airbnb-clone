//it should be in components folder
//but in nextjs 13 components can be outside
//components folder

'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";


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



    //database has only category value
    //we need icon also
    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
     }, [listing.category]);


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