import React from 'react'

export default function OrderSummaryRow({item,index,updateCartState}){
  return(

        <tr key={item.id} className={"h-25"}>
          <th scope="row">{index + 1}</th>
          <td className="w-25">
            {item.id}
          </td>
          <td>{item.createdAt}</td>
          <td>
              {item.status}
          </td>
          <td>{item.total}</td>

        </tr>

  )
}