import React from "react";
import { useRouter } from "next/router";

const ProductRow = ({ productID, productName, productImage, price, capacity, description, categoryID,onDelete }) => {
	const router = useRouter();
	return (
		<tr>
            <td>{productID}</td>
            <td>{productName}</td>
            <td>
                <img src={productImage} alt="image" className="w-75" />    
            </td>
            <td>{price}</td>
            <td>{capacity}</td>
            <td>{description}</td>
			<td>{categoryID}</td>
			<td class="text-end">
				<button
					onClick={() => onDelete(productID)}
					type="button"
					className="btn btn-danger btn-sm fs-12"
				>
					Xóa
				</button>
				<button
					type="button"
					className="btn btn-success btn-sm fs-12 ms-2 mt-3"
					onClick={() => router.push(`/admin/products/${productID}`)}
				>
					Sửa
				</button>
			</td>
		</tr>
	);
};

export default ProductRow;
