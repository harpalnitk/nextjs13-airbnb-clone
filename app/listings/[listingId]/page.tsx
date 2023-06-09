import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";


interface IParams {
    listingId?: string;
  }


  //this is a server componnet
  //we cannot use hooks here

  // we can still access parameters in server components
  //whihc in our case is in the URL
const ListingPage= async ({ params }: { params: IParams })=>{

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
          <ClientOnly>
            <EmptyState />
          </ClientOnly>
        );
      }

      
      return (
        <ClientOnly>
          <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
          />
        </ClientOnly>
      );
}
export default ListingPage;