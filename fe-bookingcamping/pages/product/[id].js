import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from '../../components/_App/Footer';
import { baseUrl } from '../../utils/baseUrl';


const SingleProductPage = ({user}) => {
    const router = useRouter();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
    const { id } = router.query;
    console.log(id);

    useEffect(() => {
		const fetchProduct = async () => {
			try {
				const url = `${baseUrl}/api/product/GetProductById/${id}`;
				const response = await axios.get(url);
				setProduct(response.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchProduct();
	},[]);

    return (
        <>
			<Navbar user={user} />

			<PageBanner
				pageTitle={product && product.productName}
				homePageUrl="/"
				homePageText="Trang chủ"
				activePageText={product && product.productName}
			/>

			{product && 
                <>
                    <div className="courses-details-area ptb-100">
                        <div className="container">
                            <div className="courses-details-header">
                                <div className="row align-items-center">
                                    <div className="col-lg-8 col-md-12">
                                        <div className="courses-title">
                                            <p>{product.productName}</p>
                                        </div>
                                        <div className="courses-meta">
                                            <ul>
                                                <li>
                                                    <i className="bx bx-folder-open"></i>
                                                    <span>Danh mục</span>
                                                    <Link
                                                        href={`/category/${product.categoryID}`}
                                                    >
                                                        <a>{product.categoryID}</a>
                                                    </Link>
                                                </li>
                                                {product.capacity && 
                                                <li>
                                                    <i className="bx bx-group"></i>
                                                    <span>Sức chứa</span>
                                                    <Link href="#">
                                                        <a>
                                                            {product.capacity}
                                                        </a>
                                                    </Link>
                                                </li>}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-12">
                                        <div className="courses-price">
                                            <div className="price">
                                                {new Intl.NumberFormat('vi-VN', {
												    style: 'currency',
												    currency: 'VND',
												}).format(product.price)}
                                            </div>

                                            <button
                                                onClick={() => router.push("/booking")}
                                                className="default-btn"
                                            >
                                                <i className="flaticon-right-arrow"></i> Đặt chỗ ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <div className="courses-details-image-style-two text-center">
                                        <img src={product.productImage} alt="image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

			<Footer />
		</>
    );
}

export default SingleProductPage;