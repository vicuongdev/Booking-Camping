import React from "react";
import { useRouter } from "next/router";

const BookingRow = ({ fullName, phoneNumber,adult,  locationID, dayCheckIn, dayCheckOut }) => {
	const router = useRouter();
    console.log(dayCheckIn);
	return (
		<tr>
            
            <td>{fullName}</td>
            <td>
                {phoneNumber}    
            </td>
            <td>{adult}</td>
            <td>{locationID}</td>
            <td>{dayCheckIn.split('T')[0]}</td>
            <td>{dayCheckOut.split('T')[0]}</td>
		</tr>
	);
};

export default BookingRow;
