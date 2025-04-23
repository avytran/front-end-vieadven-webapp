import React from 'react'
import './Item.css'

export const Item = ({ item }) => {
    return(
        <div className="item-container">
            <img className="item-icon" src={item.icon_url} alt="" />
            <span>{item.quantity}</span>
        </div>
    )
}
