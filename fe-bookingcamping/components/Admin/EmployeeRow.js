import React from "react";
import { useRouter } from "next/router";

const EmployeeRow = ({ employeeID, employeeName, image, phoneNumber, onDelete , onAdmin}) => {
	const router = useRouter();
	return (
		<tr>
            <td>{employeeID}</td>
			<td>{employeeName}</td>
            <td>{phoneNumber}</td>
            <td>
                <img src={image} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/images/avatar.jpg";
                  }}
                alt="image" className="w-100px" />
            </td>
			<td>
				<button
					onClick={() => onDelete(employeeID)}
					type="button"
					className="btn btn-danger btn-sm fs-12"
				>
					Xóa
				</button>
				<button
					type="button"
					className="btn btn-success btn-sm fs-12 ms-2"
					onClick={() => onAdmin(employeeID)}
				>
					Make a Admin
				</button>
			</td>
		</tr>
	);
};

export default EmployeeRow;
