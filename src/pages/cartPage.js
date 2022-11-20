import React from "react";
import userLayout from "../user/userLayout"
import "./../assets/css/user-view.css";

const CartPage = () => {
        return <>
            <div class="container padding-bottom-3x marginTop marginBot">
                <div class="table-responsive shopping-cart">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th class="text-center">Quantity</th>
                                <th class="text-center">Subtotal</th>
                                <th class="text-center">Discount</th>
                                <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#">Clear Cart</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="product-item">
                                        <a class="product-thumb" href="#"><img src="https://via.placeholder.com/220x180/FF0000/000000" alt="Product"/></a>
                                        <div class="product-info">
                                            <h4 class="product-title"><a href="#">Unionbay Park</a></h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="count-input">
                                        <select class="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="text-center text-lg text-medium">$43.90</td>
                                <td class="text-center text-lg text-medium">$18.00</td>
                                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="product-item">
                                        <a class="product-thumb" href="#"><img src="https://via.placeholder.com/220x180/5F9EA0/000000" alt="Product"/></a>
                                        <div class="product-info">
                                            <h4 class="product-title"><a href="#">Daily Fabric Cap</a></h4><span><em>Size:</em> XL</span><span><em>Color:</em> Black</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="count-input">
                                        <select class="form-control">
                                            <option>1</option>
                                            <option selected="">2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="text-center text-lg text-medium">$24.89</td>
                                <td class="text-center">—</td>
                                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="product-item">
                                        <a class="product-thumb" href="#"><img src="https://via.placeholder.com/220x180/9932CC/000000" alt="Product"/></a>
                                        <div class="product-info">
                                            <h4 class="product-title"><a href="#">Cole Haan Crossbody</a></h4><span><em>Size:</em> -</span><span><em>Color:</em> Turquoise</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="count-input">
                                        <select class="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="text-center text-lg text-medium">$200.00</td>
                                <td class="text-center">—</td>
                                <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column text-lg">Subtotal: <span class="text-medium">$289.68</span></div>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column"><a class="btn btn-outline-secondary" href="/shop"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                    <div class="column"><a class="btn btn-primary" href="#" data-toast="" data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Your cart" data-toast-message="is updated successfully!">Update Cart</a><a class="btn btn-success" href="#">Checkout</a></div>
                </div>
            </div>
        </>

}

export default userLayout(CartPage);