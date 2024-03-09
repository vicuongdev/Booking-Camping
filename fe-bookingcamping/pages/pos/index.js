import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "../../utils/GeneralLoader";
import { confirmAlert } from "react-confirm-alert";
import Cookies from 'js-cookie';


const Index = ({ user }) => {
	
	return (
		<>
			<div className="main-content">
				<div className="container-fluid">
					<div className="row">

						<div className="col-lg-6">
							<div className="main-content-box">
								{/* Nav */}
								<ul className="nav-style1">
									<li>
										<Link href="/admin/products/">
											<a className="active">Sản phẩm</a>
										</Link>
									</li>
									<li>
										<Link href="/admin/products/create/">
											<a>Create</a>
										</Link>
									</li>
								</ul>

								
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
