import React from "react";
import { useRouter } from "next/router";

const AdminRow = ({ adminID, adminName, image, phoneNumber}) => {
	const router = useRouter();
	return (
		<tr>
            <td>{adminID}</td>
			<td>{adminName}</td>
            <td>{phoneNumber}</td>
            <td>
                <img src={image} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/images/avatar.jpg";
                  }}
                alt="image" className="w-100px" />
            </td>
		</tr>
	);
};

export default AdminRow;
