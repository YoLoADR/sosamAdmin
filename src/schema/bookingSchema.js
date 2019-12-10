import gql from "graphql-tag";


const Booking = `{
    id
    tripdate
    trip_start_time
    trip_end_time
    customer_name
    carType
    vehicle_number
    driver_number
    passenger_number
    kilometer_number
    hour_number
    day_number
    pickupAddress
    pickupCity
    dropAddress
    dropCity
    driver_name
    status
    trip_cost
    discount
    payment_status
    createdAt
    comment
}`

export const UPDATE_BOOKING = gql`
    mutation updateBooking(
            $id: ID!,
            $tripdate: String,
            $trip_start_time: String,
            $trip_end_time: String,
            $customer_name: String,
            $carType: String,
            $vehicle_number: String,
            $driver_number: String,
            $passenger_number: String,
            $kilometer_number: String,
            $hour_number: String,
            $day_number: String,
            $pickupAddress: String,
            $pickupCity: String,
            $dropAddress: String,
            $dropCity: String,
            $driver_name: String,
            $status: String,
            $trip_cost: String,
            $discount: String,
            $payment_status: String,
            $comment: String,
        ) {
            updateBooking (
                id: $id,
                tripdate: $tripdate,
                trip_start_time: $trip_start_time,
                trip_end_time: $trip_end_time,
                customer_name: $customer_name,
                carType: $carType,
                vehicle_number: $vehicle_number,
                driver_number: $driver_number,
                passenger_number: $passenger_number,
                kilometer_number: $kilometer_number,
                hour_number: $hour_number,
                day_number: $day_number,
                pickupAddress: $pickupAddress,
                pickupCity: $pickupCity,
                dropAddress: $dropAddress,
                dropCity: $dropCity,
                driver_name: $driver_name,
                status: $status,
                trip_cost: $trip_cost,
                discount: $discount,
                payment_status: $payment_status,
                comment: $comment,
            ) ${Booking}
        }
` 