import React from "react";
import TableCell from '@mui/material/TableCell';
import ClearIcon from '@mui/icons-material/Clear';
import TableRow from '@mui/material/TableRow';

export default function WishListItem(props: any) {
    return (
        <TableRow >
        <TableCell className="li-product-remove">
          <a href="#">
            <ClearIcon onClick={() =>props.remove(props.item.id)} />
          </a>
        </TableCell>
        <TableCell className="li-product-thumbnail">
          <a href="#">
            <img src={props.item?.image} alt="dd" style={{ width: '200px', height: '200px' }} />
          </a>
        </TableCell>
        <TableCell className="li-product-name">
          <a href="#">{props.item?.product?.name}</a>
        </TableCell>
        <TableCell className="li-product-price">
          <span className="amount">${props.item?.product?.price}</span>
        </TableCell>
        <TableCell className="li-product-stock-status">
          <span className={props.item?.product?.stock > 0 ? 'in-stock' : 'out-stock'}>
            {props.item?.product?.stock > 0 ? 'in stock' : 'out of stock'}
          </span>
        </TableCell>
        <TableCell className="li-product-add-cart">
          <button onClick={() => props.add(props.item?.product?.id)}>add to cart</button>
        </TableCell>
      </TableRow>
                                                                               
    );
};

