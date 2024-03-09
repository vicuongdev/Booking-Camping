import React from "react";
import { useRouter } from "next/router";

const CategoryRow = ({ categoryID, categoryName, onDelete }) => {
	const router = useRouter();
	return (
		<tr>
            <td>{categoryID}</td>
			<td>{categoryName}</td>
			<td>
				<button
					onClick={() => onDelete(categoryID)}
					type="button"
					className="btn btn-danger btn-sm fs-12"
				>
					Xóa
				</button>
				<button
					type="button"
					className="btn btn-success btn-sm fs-12 ms-2"
					onClick={() => router.push(`/admin/categories/${categoryID}`)}
				>
					Sửa
				</button>
			</td>
		</tr>
	);
};

export default CategoryRow;
